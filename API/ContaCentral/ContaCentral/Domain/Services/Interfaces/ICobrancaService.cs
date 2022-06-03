using ContaCentral.Domain.Models;
using ContaCentral.Domain.Models.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContaCentral.Domain.Services.Interfaces
{
    public interface ICobrancaService
    {
        Task<Boolean> CreateCobranca(CobrancaDTO cobrancaDTO);
        Task<List<Cobranca>> ListCobrancasPendentes();
        Task<Boolean> PagarCobranca(int cobrancaId);
        Task<Boolean> RejeitarCobranca(int cobrancaId);
    }
}
