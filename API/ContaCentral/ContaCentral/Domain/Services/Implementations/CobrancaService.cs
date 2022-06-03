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
    public class CobrancaService : ICobrancaService
    {
        private readonly CobrancaRepository _cobrancaRepository;
        private readonly IAuthService _authenticationService;
        private readonly CarteiraRepository _carteiraRepository;
        private readonly ITransferenciaService _transferenciaService;

        public CobrancaService(CobrancaRepository cobrancaRepository, IAuthService authenticationService, CarteiraRepository carteiraRepository, ITransferenciaService transferenciaService)
        {
            _cobrancaRepository = cobrancaRepository;
            _authenticationService = authenticationService;
            _carteiraRepository = carteiraRepository;
            _transferenciaService = transferenciaService;
        }

        public async Task<Boolean> CreateCobranca(CobrancaDTO cobrancaDTO)
        {
            ApplicationUser currentUser = await _authenticationService.GetCurrentUser();
            Carteira findToCarteira = await _carteiraRepository.GetByIdAsync(cobrancaDTO.ToCarteiraId);

            if (findToCarteira == null)
                throw new ArgumentException("Carteira não existe!");

            if (!findToCarteira.Ativo)
                throw new ArgumentException("Essa carteira foi desativada!");

            if (findToCarteira.Id == cobrancaDTO.FromCarteiraId)
                throw new ArgumentException("Não é possivel cobrar a mesma Carteira");

            Cobranca novaCobranca = new Cobranca
            {
                Valor = cobrancaDTO.Valor,
                Descricao = cobrancaDTO.Descricao,
                FromUserId = currentUser.Id,
                ToUserId = findToCarteira.UserId,
                ToUser = findToCarteira.User,
                FromCarteiraId = cobrancaDTO.FromCarteiraId,
                ToCarteiraId = findToCarteira.Id,
                CobrancaAtiva = true,
                Data = DateTime.Now
            };
            await _cobrancaRepository.CreateAsync(novaCobranca);

            return true;
        }

        public async Task<List<Cobranca>> ListCobrancasPendentes()
        {
            ApplicationUser currentUser = await _authenticationService.GetCurrentUser();

            List<Cobranca> findCobrancas = await _cobrancaRepository.ListCobrancasPendentes(currentUser.Id);

            return findCobrancas;
        }

        public async Task<Boolean> PagarCobranca(int cobrancaId)
        {
            ApplicationUser currentUser = await _authenticationService.GetCurrentUser();
            Cobranca findCobranca =  await _cobrancaRepository.GetByIdAsync(cobrancaId);

            if(findCobranca == null)
                throw new ArgumentException("Cobranca nao existe");

            if(findCobranca.ToUserId != currentUser.Id)
                throw new ArgumentException("Nao é possivel pagar uma cobranca de outro usuario");

            Carteira findCarteira = await _carteiraRepository.GetCarteiraById(findCobranca.ToCarteiraId);

            TransferirDTO transferirDto = new TransferirDTO
            {
                Valor = findCobranca.Valor,
                Descricao = findCobranca.Descricao,
                FromCarteiraId = findCarteira.Id,
                ToCarteiraId = findCobranca.FromCarteiraId,
            };

            await _transferenciaService.Transferir(transferirDto);

            findCobranca.CobrancaAtiva = false;

            await _cobrancaRepository.UpdateAsync(findCobranca);

            return true;
        }

        public async Task<Boolean> RejeitarCobranca(int cobrancaId)
        {
            ApplicationUser currentUser = await _authenticationService.GetCurrentUser();
            Cobranca findCobranca = await _cobrancaRepository.GetByIdAsync(cobrancaId);

            if (findCobranca == null)
                throw new ArgumentException("Cobranca nao existe");

            if (findCobranca.ToUserId != currentUser.Id && findCobranca.FromUserId != currentUser.Id)
                throw new ArgumentException("Nao é possivel rejeitar a cobranca de outro usuario");

            findCobranca.CobrancaAtiva = false;
            await _cobrancaRepository.UpdateAsync(findCobranca);

            return true;
        }
    }
}
