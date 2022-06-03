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
    public class CarteiraService : ICarteiraService
    {
        private readonly CarteiraRepository _carteiraRepository;
        private readonly IAuthService _authService;
        private readonly TransacaoRepository _transacaoRepository;

        public CarteiraService(CarteiraRepository carteiraRepository, IAuthService authService, TransacaoRepository transacaoRepository, TransferenciaRepository transferenciaRepository, DepositoRepository depositoRepository, SaqueRepository saqueRepository)
        {
            _authService = authService;
            _carteiraRepository = carteiraRepository;
            _transacaoRepository = transacaoRepository;
        }

        public async Task<Carteira> CreateCarteira(Carteira carteira)
        {
            ApplicationUser currentUser = await _authService.GetCurrentUser();

            Carteira novaCarteira = new Carteira
            {
                Nome = carteira.Nome,
                Saldo = 0,
                UserId = currentUser.Id,
                Ativo = true
            };
            novaCarteira = await _carteiraRepository.CreateAsync(novaCarteira);

            return novaCarteira;
        }

        public async Task<Carteira> GetCarteiraById(int carteiraId)
        {
            ApplicationUser currentUser = await _authService.GetCurrentUser();

            Carteira findCarteira = await _carteiraRepository.GetByIdAsync(carteiraId);

            if (findCarteira.UserId != currentUser.Id)
                throw new ArgumentException("Sem permissão para ver carteira de outra pessoa!");

            if (findCarteira == null)
                throw new ArgumentException("Carteira não existe!");

            if (!findCarteira.Ativo)
                throw new ArgumentException("Essa carteira foi desativada!");

            return findCarteira;
        }

        public async Task<List<Carteira>> ListMinhasCarteiras()
        {
            ApplicationUser currentUser = await _authService.GetCurrentUser();

            List<Carteira> findListCarteira = await _carteiraRepository.ListMinhasCarteiras(currentUser.Id);

            if (findListCarteira == null)
                throw new ArgumentException("Carteiras não existe!");

            return findListCarteira;
        }

        public async Task<List<Carteira>> SearchCarteira(SearchDTO searchDTO)
        {
            // Pagina selecionada
            int pageNumber;
            if (searchDTO.PageNumber < 1)
                pageNumber = 1;
            else
                pageNumber = searchDTO.PageNumber;

            // Tamanho da pagina
            int pageSize;
            if (searchDTO.PageSize > 20)
                pageSize = 20;
            else if (searchDTO.PageSize < 1)
                pageSize = 1;
            else
                pageSize = searchDTO.PageSize;

            // Primeira posição da pagina selecionada
            int firstPosition = (pageNumber - 1) * pageSize;

            // Fazendo a busca ordenada
            List<Carteira> carteiras;
            carteiras = await _carteiraRepository.ListCarteirasPaginationOrderById(searchDTO.SearchString, firstPosition, pageSize);

            return carteiras;
        }

        public async Task<Transacao> GetTransacao(int transacaoId)
        {
            ApplicationUser currentUser = await _authService.GetCurrentUser();

            Transacao transacao = await _transacaoRepository.GetByIdAsync(transacaoId);

            List<Carteira> findListCarteira = await _carteiraRepository.ListMinhasCarteiras(currentUser.Id);
            Carteira findCarteira = await _carteiraRepository.GetByIdAsync(transacao.CarteiraId);

            if (findListCarteira.Contains(findCarteira) == false )
                throw new ArgumentException("Sem permissao para obter trasação de outra pessoa!");

            if (!findCarteira.Ativo)
                throw new ArgumentException("Essa carteira foi desativada!");

            return transacao;
        }

        public async Task<List<Transacao>> ListTransacoesByCarteiraId(int carteiraId)
        {
            ApplicationUser currentUser = await _authService.GetCurrentUser();

            Carteira findCarteira = await _carteiraRepository.GetByIdAsync(carteiraId);
            if (findCarteira == null)
                throw new ArgumentException("Carteira não existe!");
            if (findCarteira.UserId != currentUser.Id)
                throw new ArgumentException("Sem permissao para obter um transação de outra pessoa!");

            if (!findCarteira.Ativo)
                throw new ArgumentException("Essa carteira foi desativada!");

            List<Transacao> transacoes = await _transacaoRepository.ListTransacaoByCarteiraId(carteiraId);

            return transacoes;
        }

        public async Task<List<Transacao>> ListTransacoesByUserId()
        {
            ApplicationUser currentUser = await _authService.GetCurrentUser();

            if (currentUser == null)
                throw new ArgumentException("Usuário não existe.");

            List<Transacao> transacoes = await _transacaoRepository.ListTransacoesByUserId(currentUser.Id);

            return transacoes;
        }
        
        public async Task<Boolean> DesativarCarteira(int carteiraId)
        {
            ApplicationUser currentUser = await _authService.GetCurrentUser();

            Carteira findCarteira = await _carteiraRepository.GetByIdAsync(carteiraId);

            if (findCarteira == null)
                throw new ArgumentException("Essa carteira nao existe!");

            if (!findCarteira.Ativo)
                throw new ArgumentException("Essa carteira ja foi desativada!");

            if(currentUser.Id != findCarteira.UserId)
                throw new ArgumentException("Sem permissão para desativar carteira de outra pessoa!");

            if (findCarteira.Saldo != 0)
                throw new ArgumentException("Impossivel desativar carteira com saldo 0");

            findCarteira.Ativo = false;

            await _carteiraRepository.UpdateAsync(findCarteira);

            return true;
        }
        public async Task<Boolean> UpdateCarteiraPrincipal(int carteiraId)
        {
            ApplicationUser currentUser = await _authService.GetCurrentUser();
            Carteira findCarteira = await _carteiraRepository.GetCarteiraPrincipal(currentUser.Id);
            Carteira newPrincipalCarteira = await _carteiraRepository.GetCarteiraById(carteiraId);

            if (findCarteira == null || newPrincipalCarteira == null)
                throw new ArgumentException("Carteira não encontrada!");

            if (findCarteira.Id == newPrincipalCarteira.Id)
                throw new ArgumentException("Essa carteira já é a principal!");

            if (findCarteira.Principal && newPrincipalCarteira.UserId == currentUser.Id)
            {
                findCarteira.Principal = false;
                newPrincipalCarteira.Principal = true;
                await _carteiraRepository.UpdateAsync(findCarteira);
                await _carteiraRepository.UpdateAsync(newPrincipalCarteira);
            }

            return true;
        }

    }
}
