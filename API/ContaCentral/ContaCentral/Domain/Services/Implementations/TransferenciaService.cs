using ContaCentral.Domain.Models;
using ContaCentral.Domain.Models.DTOs;
using ContaCentral.Domain.Services.Interfaces;
using ContaCentral.Infrastructure.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContaCentral.Domain.Services.Implementations
{
    public class TransferenciaService : ITransferenciaService
    {
        private readonly CarteiraRepository _carteiraRepository;
        private readonly IAuthService _authService;
        private readonly TransacaoRepository _transacaoRepository;
        private readonly TransferenciaRepository _transferenciaRepository;

        public TransferenciaService(CarteiraRepository carteiraRepository, IAuthService authService, TransacaoRepository transacaoRepository, TransferenciaRepository transferenciaRepository)
        {
            _authService = authService;
            _carteiraRepository = carteiraRepository;
            _transacaoRepository = transacaoRepository;
            _transferenciaRepository = transferenciaRepository;
        }

        public async Task<Transferencia> Transferir(TransferirDTO transferirDTO)
        {
            ApplicationUser currentUser = await _authService.GetCurrentUser();

            Carteira findFromCarteira = await _carteiraRepository.GetByIdAsync(transferirDTO.FromCarteiraId);
            if (findFromCarteira.UserId != currentUser.Id)
                throw new ArgumentException("Não é proprietario desta carteira.");
            if (!findFromCarteira.Ativo)
                throw new ArgumentException("A sua carteira foi desativada!");             

            Carteira findToCarteira = await _carteiraRepository.GetByIdAsync(transferirDTO.ToCarteiraId);
            if (findToCarteira == null)
                throw new ArgumentException("Carteira não existe! Verifique o id da carteira esta correto.");
            if (!findToCarteira.Ativo)
                throw new ArgumentException("A carteira do remetente foi desativada!");

            if (transferirDTO.ToCarteiraId == transferirDTO.FromCarteiraId)
                throw new ArgumentException("Está tentando fazer uma Tranferencia para mesma carteira.");
            if (transferirDTO.Valor <= 0)
                throw new ArgumentException("Esta tentando transferir um valor nulo ou negativo.");

            if (findFromCarteira.Saldo < transferirDTO.Valor)
                throw new ArgumentException("Não possui saldo suficiente para efetuar a Tranferencia.");

            findFromCarteira.Saldo -= transferirDTO.Valor;
            await _carteiraRepository.UpdateAsync(findFromCarteira);

            findToCarteira.Saldo += transferirDTO.Valor;
            await _carteiraRepository.UpdateAsync(findToCarteira);
           
            Transferencia novaTransferencia = new Transferencia
            {
                Valor = transferirDTO.Valor,
                ToCarteiraId = transferirDTO.ToCarteiraId,
                FromCarteiraId = findFromCarteira.Id,
                DataHora = DateTime.Now,
                Descricao = transferirDTO.Descricao
            };
            novaTransferencia = await _transferenciaRepository.CreateAsync(novaTransferencia);

            Transacao fromTransacao = new Transacao
            {
                Valor = -(novaTransferencia.Valor),
                CarteiraId = novaTransferencia.FromCarteiraId,
                DataHora = novaTransferencia.DataHora,
                Descricao = novaTransferencia.Descricao,

                OrigemId = novaTransferencia.Id,
                OrigemTipo = 2
            };
            await _transacaoRepository.CreateAsync(fromTransacao);

            Transacao toTransacao = new Transacao
            {
                Valor = novaTransferencia.Valor,
                CarteiraId = novaTransferencia.ToCarteiraId,
                DataHora = novaTransferencia.DataHora,
                Descricao = novaTransferencia.Descricao,

                OrigemId = novaTransferencia.Id,
                OrigemTipo = 2
            };
            await _transacaoRepository.CreateAsync(toTransacao);

            return novaTransferencia;
        }

        public async Task<List<Transferencia>> ListTransferenciasByCarteiraId(int carteiraId)
        {
            ApplicationUser currentUser = await _authService.GetCurrentUser();

            Carteira findCarteira = await _carteiraRepository.GetByIdAsync(carteiraId);
            if (findCarteira == null)
                throw new ArgumentException("Carteira não existe!");
            if (findCarteira.UserId != currentUser.Id)
                throw new ArgumentException("Não é proprietario desta carteira.");

            if (!findCarteira.Ativo)
                throw new ArgumentException("Essa carteira foi desativada!");                  

            List<Transferencia> transferencias = await _transferenciaRepository.ListTransferenciasByCarteiraId(carteiraId);

            return transferencias;
        }

        public async Task<Transferencia> GetTransferenciaById(int transferenciaId)
        {
            ApplicationUser currentUser = await _authService.GetCurrentUser();

            Transferencia findTransferencia = await _transferenciaRepository.GetByIdAsync(transferenciaId);
            if (findTransferencia == null)
                throw new ArgumentException("Transferencia não existe!");

            return await _transferenciaRepository.GetByIdAsync(transferenciaId);
        }

    }
}
