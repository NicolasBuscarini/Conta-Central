using ContaCentral.Domain.Models;
using ContaCentral.Domain.Models.DTOs;
using ContaCentral.Domain.Models.Relatorios;
using ContaCentral.Domain.Services.Interfaces;
using ContaCentral.Infrastructure.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContaCentral.Domain.Services.Implementations
{
    public class RelatorioService : IRelatorioService
    {
        private readonly RelatorioRepository _relatorioRepository;
        private readonly TransacaoRepository _transacaoRepository;
        private readonly ICarteiraService _carteiraService;
        private readonly IAuthService _authService;

        public RelatorioService(IAuthService authService, ICarteiraService carteiraService, RelatorioRepository relatorioRepository, TransacaoRepository transacaoRepository)
        {
            _carteiraService = carteiraService;
            _relatorioRepository = relatorioRepository;
            _transacaoRepository = transacaoRepository;
            _authService = authService;
        }

        public async Task<RelatorioRecDesp> GetRelatorioRecDespByCarteiraIdAndAnoAndMes(int carteiraId, int ano, int mes)
        {
            Carteira carteira = await _carteiraService.GetCarteiraById(carteiraId);
            if (carteira == null)
                throw new ArgumentException("Essa carteira não existe!");

            RelatorioRecDesp findRelatorio = await _relatorioRepository.GetRelatorioRecDespByCarteiraIdAndAnoAndMes(carteira.Id, ano, mes);
            return findRelatorio;
        }

        public async Task<RelatorioRecDesp> GerarRelatorioRecDespByCarteiraIdAndAnoAndMes(int carteiraId, int ano, int mes)
        {
            DateTime today = DateTime.Now;
            if(ano > today.Year)
                throw new ArgumentException("Impossível gerar relatório desse ano.");

            if(mes >= today.Month && ano == today.Year)
                throw new ArgumentException("Impossível gerar relatório desse mês.");

            Carteira carteira = await _carteiraService.GetCarteiraById(carteiraId);
            if (carteira == null)
                throw new ArgumentException("Essa carteira não existe!");

            RelatorioRecDesp relatorio = new();
            relatorio.CreatedAt = DateTime.Now;
            relatorio.CarteiraId = carteira.Id;
            relatorio.Ano = ano;
            relatorio.Mes = mes;
            relatorio.Receita = await _transacaoRepository.GetReceitaSumByCarteiraIdAndAnoAndMes(carteiraId, ano, mes);
            relatorio.Despesa = await _transacaoRepository.GetDespesaSumByCarteiraIdAndAnoAndMes(carteiraId, ano, mes);
            relatorio.Total = relatorio.Receita - relatorio.Despesa;

            RelatorioRecDesp findRelatorio = await _relatorioRepository.GetRelatorioRecDespByCarteiraIdAndAnoAndMes(relatorio.CarteiraId, relatorio.Ano, relatorio.Mes);

            if (findRelatorio != null)
                await _relatorioRepository.UpdateAsync(relatorio);
            else
                await _relatorioRepository.CreateAsync(relatorio);

            return relatorio;
        }

        public async Task<bool> GerarRelatorioRecDespMensalByCarteiraIdAndAno (int carteiraId, int ano)
        {
            DateTime today = DateTime.Now;

            if (ano > today.Year)
                throw new ArgumentException("Impossível gerar relatório desse ano.");

            Carteira carteira = await _carteiraService.GetCarteiraById(carteiraId);
            if (carteira == null)
                throw new ArgumentException("Essa carteira não existe!");

            int meses = today.Month - 1;
            if (ano < today.Year)
                meses = 12;

            for(int mes = 1; mes < meses+1; mes++)
            {
                await GerarRelatorioRecDespByCarteiraIdAndAnoAndMes(carteiraId, ano, mes);
            }

            return true;
        }

        public async Task<RelatorioRecDespDTO> GetRelatorioRecDespMensalByCarteiraIdAndAno (int carteiraId, int ano)
        {
            DateTime today = DateTime.Now;

            if (ano > today.Year)
                throw new ArgumentException("Essa data ainda não existe.");

            int meses = today.Month;
            if (ano < today.Year)
                meses = 12;

            Carteira carteira = await _carteiraService.GetCarteiraById(carteiraId);
            if (carteira == null)
                throw new ArgumentException("Essa carteira não existe!");

            List<RelatorioRecDesp> relatoriosRecDesp = await _relatorioRepository.ListRelatorioRecDespByCarteiraIdAndAnoAndMes(carteira.Id, ano, meses);
            
            RelatorioRecDespDTO relatorioRecDespDTO = new();
            relatorioRecDespDTO.relatorioRecDespItems = new();
            relatorioRecDespDTO.CarteiraId = carteiraId;
            relatorioRecDespDTO.Tipo = meses;

            foreach (RelatorioRecDesp relatorioRecDesp in relatoriosRecDesp)
            {
                RelatorioRecDespItemDTO relatorioRecDespItemDTO = new();
                relatorioRecDespItemDTO.Receita = relatorioRecDesp.Receita;
                relatorioRecDespItemDTO.Despesa = relatorioRecDesp.Despesa;
                relatorioRecDespItemDTO.Periodo = relatorioRecDesp.Mes;
                relatorioRecDespItemDTO.Total = relatorioRecDesp.Total;
                relatorioRecDespDTO.relatorioRecDespItems.Add(relatorioRecDespItemDTO);
            }

            return relatorioRecDespDTO;
        }

        public async Task<bool> GerarRelatorioRecDespMensalByCurrentUserAndAno (int ano)
        {
            List<Carteira> carteiras = await _carteiraService.ListMinhasCarteiras();

            foreach (Carteira carteira in carteiras)
            {
               await GerarRelatorioRecDespMensalByCarteiraIdAndAno(carteira.Id, ano);
            }
            
            return true;
        }

        public async Task<List<RelatorioRecDespDTO>> GetRelatorioRecDespMensalByCurrentUserAndAno (int ano)
        {
            List<Carteira> carteiras = await _carteiraService.ListMinhasCarteiras();

            DateTime today = DateTime.Now;

            if (ano > today.Year)
                throw new ArgumentException("Essa data ainda não existe.");

            List<RelatorioRecDespDTO> relatoriosDTO = new();

            foreach (Carteira carteira in carteiras)
            {
                if (carteira == null)
                    throw new ArgumentException("Essa carteira não existe!");

                RelatorioRecDespDTO relatorio = await GetRelatorioRecDespMensalByCarteiraIdAndAno(carteira.Id, ano);
                relatoriosDTO.Add(relatorio);
            }

            return relatoriosDTO;
        }

        public async Task<List<int>> ListRelatorioAnosDisponiveis()
        {
            List<Carteira> carteiras = await _carteiraService.ListMinhasCarteiras();
            List<int> anosDisponiveis = new();
            int ano = 2021;
            while(ano <= DateTime.Now.Year)
            {
                foreach (Carteira carteira in carteiras)
                {
                    List<RelatorioRecDesp> relatoriosCarteira = await _relatorioRepository.ListRelatorioRecDespByCarteiraIdAndAno(carteira.Id, ano);
                    foreach (RelatorioRecDesp relatorio in relatoriosCarteira)
                    {
                        if (!anosDisponiveis.Contains(relatorio.Ano))
                        {
                            anosDisponiveis.Add(relatorio.Ano);
                        }
                        else
                            continue;
                    }
                }
                ano++;
            }

            return anosDisponiveis;
        }

        public async Task<List<int>> ListAnosDisponiveisToCreateRelatorio()
        {
            List<Carteira> carteiras = await _carteiraService.ListMinhasCarteiras();
            List<int> anosDisponiveis = new();
            int ano = 2020;

            foreach (Carteira carteira in carteiras)
            {
                List<Transacao> transacoesCarteira = await _transacaoRepository.ListTransacaoByCarteiraId(carteira.Id);

                foreach (Transacao transacao in transacoesCarteira)
                {
                    if (!anosDisponiveis.Contains(transacao.DataHora.Year))
                    {
                        anosDisponiveis.Add(transacao.DataHora.Year);
                        ano++;
                    }
                    else
                        continue;
                }
            }

            return anosDisponiveis;
        }
    }
}