using ContaCentral.Domain.Models.DTOs;
using ContaCentral.Domain.Models.Relatorios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContaCentral.Domain.Services.Interfaces
{
    public interface IRelatorioService
    {
        Task<RelatorioRecDesp> GetRelatorioRecDespByCarteiraIdAndAnoAndMes(int carteiraId, int ano, int mes);
        Task<RelatorioRecDesp> GerarRelatorioRecDespByCarteiraIdAndAnoAndMes(int carteiraId, int ano, int mes);
        Task<bool> GerarRelatorioRecDespMensalByCarteiraIdAndAno(int carteiraId, int ano);
        Task<RelatorioRecDespDTO> GetRelatorioRecDespMensalByCarteiraIdAndAno(int carteiraId, int ano);
        Task<bool> GerarRelatorioRecDespMensalByCurrentUserAndAno(int ano);
        Task<List<RelatorioRecDespDTO>> GetRelatorioRecDespMensalByCurrentUserAndAno(int ano);
        Task<List<int>> ListRelatorioAnosDisponiveis();
        Task<List<int>> ListAnosDisponiveisToCreateRelatorio();

    }
}
