using ContaCentral.Domain.Models;
using ContaCentral.Domain.Models.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContaCentral.Domain.Services.Interfaces
{
    public interface IDepositoService
    {
        Task<Deposito> Depositar(DepositarDTO depositoDTO);
        Task<List<Deposito>> ListDepositosByCarteiraId(int carteiraId);
        Task<Deposito> GetDeposito(int depositoId);
    }
}
