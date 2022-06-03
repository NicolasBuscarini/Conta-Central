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
    public class DepositoService : IDepositoService
    {
        private readonly CarteiraRepository _carteiraRepository;
        private readonly IAuthService _authService;
        private readonly TransacaoRepository _transacaoRepository;
        private readonly DepositoRepository _depositoRepository;

        public DepositoService(CarteiraRepository carteiraRepository, IAuthService authService, TransacaoRepository transacaoRepository, DepositoRepository depositoRepository)
        {
            _authService = authService;
            _carteiraRepository = carteiraRepository;
            _transacaoRepository = transacaoRepository;
            _depositoRepository = depositoRepository;
        }

        public async Task<Deposito> Depositar(DepositarDTO depositoDTO)
        {
            ApplicationUser currentUser = await _authService.GetCurrentUser();

            Carteira findCarteira = await _carteiraRepository.GetByIdAsync(depositoDTO.CarteiraId);
            if (findCarteira == null)
                throw new ArgumentException("Carteira não existe! Verifique o id da carteira esta correto.");
            if (findCarteira.UserId != currentUser.Id)
                throw new ArgumentException("Não é proprietario desta carteira.");
            if (!findCarteira.Ativo)
                throw new ArgumentException("Essa carteira foi desativada!");
            if (depositoDTO.Valor <= 0)
                throw new ArgumentException("Esta tentando depositar um valor nulo ou negativo.");
            
            Deposito novoDeposito = new Deposito
            {
                Valor = depositoDTO.Valor,
                DataHora = DateTime.Now,
                CarteiraId = findCarteira.Id,
                Descricao = depositoDTO.Descricao,
                externalName = depositoDTO.ExternalName,
                externalId = depositoDTO.ExternalId
            };
            novoDeposito = await _depositoRepository.CreateAsync(novoDeposito);

            Transacao transacao = new Transacao
            {
                Valor = novoDeposito.Valor,
                CarteiraId = novoDeposito.CarteiraId,
                DataHora = novoDeposito.DataHora,
                Descricao = novoDeposito.Descricao,

                OrigemId = novoDeposito.Id,
                OrigemTipo = 0
            };
            await _transacaoRepository.CreateAsync(transacao);

            findCarteira.Saldo += depositoDTO.Valor;
            await _carteiraRepository.UpdateAsync(findCarteira);

            return novoDeposito;
        }

        public async Task<List<Deposito>> ListDepositosByCarteiraId(int carteiraId)
        {
            ApplicationUser currentUser = await _authService.GetCurrentUser();

            Carteira findCarteira = await _carteiraRepository.GetByIdAsync(carteiraId);
            if (findCarteira == null)
                throw new ArgumentException("Carteira não existe!");
            if (findCarteira.UserId != currentUser.Id)
                throw new ArgumentException("Sem permissao para obter um deposito de outra pessoa!");

            List<Deposito> depositos = await _depositoRepository.ListDepositosByCarteiraId(carteiraId);
            return depositos;
        }

        public async Task<Deposito> GetDeposito(int depositoId)
        {
            ApplicationUser currentUser = await _authService.GetCurrentUser();
            Deposito deposito = await _depositoRepository.GetByIdAsync(depositoId);
            Carteira carteiraDeposito = await _carteiraRepository.GetByIdAsync(deposito.CarteiraId);

            if (deposito == null)
                throw new ArgumentException("Carteira não existe!");
            if (carteiraDeposito.UserId != currentUser.Id)
                throw new ArgumentException("Sem permissão para ver carteira de outra pessoa!");
            if (!carteiraDeposito.Ativo)
                throw new ArgumentException("Essa carteira foi desativada!");

            return deposito;
        }

    }
}