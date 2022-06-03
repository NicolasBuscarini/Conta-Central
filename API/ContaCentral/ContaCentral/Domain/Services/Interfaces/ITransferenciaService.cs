using ContaCentral.Domain.Models;
using ContaCentral.Domain.Models.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContaCentral.Domain.Services.Interfaces
{
    public interface ITransferenciaService
    {
        Task<Transferencia> Transferir(TransferirDTO transferirDTO);
        Task<List<Transferencia>> ListTransferenciasByCarteiraId(int carteiraId);
        Task<Transferencia> GetTransferenciaById(int transferenciaID);
    }
}
