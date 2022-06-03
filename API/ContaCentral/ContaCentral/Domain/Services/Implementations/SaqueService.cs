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
    public class SaqueService : ISaqueService
    {
        private readonly CarteiraRepository _carteiraRepository;
        private readonly IAuthService _authService;
        private readonly TransacaoRepository _transacaoRepository;
        private readonly SaqueRepository _saqueRepository;

        public SaqueService(CarteiraRepository carteiraRepository, IAuthService authService, TransacaoRepository transacaoRepository, DepositoRepository depositoRepository, SaqueRepository saqueRepository)
        {
            _authService = authService;
            _carteiraRepository = carteiraRepository;
            _transacaoRepository = transacaoRepository;
            _saqueRepository = saqueRepository;
        }

        public async Task<Saque> Sacar(SacarDTO sacarDTO)
        {
            ApplicationUser currentUser = await _authService.GetCurrentUser();

            Carteira findCarteira = await _carteiraRepository.GetByIdAsync(sacarDTO.CarteiraId);
            if (findCarteira.UserId != currentUser.Id)
                throw new ArgumentException("Não é proprietario desta carteira.");

            if (!findCarteira.Ativo)
                throw new ArgumentException("Essa carteira foi desativada!");

            if (findCarteira.Saldo < sacarDTO.Valor)
                throw new ArgumentException("Não possui saldo suficiente para efetuar o saque.");

            Saque novoSaque = new Saque
            {
                Valor = sacarDTO.Valor,
                DataHora = DateTime.Now,
                CarteiraId = findCarteira.Id,
                Descricao = sacarDTO.Descricao
            };
            novoSaque = await _saqueRepository.CreateAsync(novoSaque);

            Transacao transacao = new Transacao
            {
                Valor = -(novoSaque.Valor),
                CarteiraId = novoSaque.CarteiraId,
                DataHora = novoSaque.DataHora,
                Descricao = novoSaque.Descricao,

                OrigemId = novoSaque.Id,
                OrigemTipo = 1
            };
            await _transacaoRepository.CreateAsync(transacao);

            findCarteira.Saldo -= sacarDTO.Valor;
            await _carteiraRepository.UpdateAsync(findCarteira);

            return novoSaque;
        }

        public async Task<List<Saque>> ListSaquesByCarteiraId(int carteiraId)
        {
            ApplicationUser currentUser = await _authService.GetCurrentUser();

            Carteira findCarteira = await _carteiraRepository.GetByIdAsync(carteiraId);
            if (findCarteira == null)
                throw new ArgumentException("Carteira não existe!");
            if (findCarteira.UserId != currentUser.Id)
                throw new ArgumentException("Sem permissao para obter um saque de outra pessoa!");

            List<Saque> depositos = await _saqueRepository.ListSaquesByCarteiraId(carteiraId);

            return depositos;
        }

        public async Task<Saque> SaqueById(int saqueId)
        {
            ApplicationUser currentUser = await _authService.GetCurrentUser();

            var findSaque = await _saqueRepository.GetByIdAsync(saqueId);
            if (findSaque == null)
                throw new ArgumentException("Saque não existe!");

            int carteiraId = findSaque.CarteiraId;
            var findCarteira = await _carteiraRepository.GetByIdAsync(carteiraId);
            if (! findCarteira.UserId.Equals(currentUser.Id))
                throw new ArgumentException("Sem permissao para obter um saque de outra pessoa!");

            return findSaque;
        }
    }
}