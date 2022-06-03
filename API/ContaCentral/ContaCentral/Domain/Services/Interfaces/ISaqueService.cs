using ContaCentral.Domain.Models;
using ContaCentral.Domain.Models.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContaCentral.Domain.Services.Interfaces
{
    public interface ISaqueService
    {
        Task<Saque> Sacar(SacarDTO sacarDTO);

        Task<List<Saque>> ListSaquesByCarteiraId(int carteiraId);

        Task<Saque> SaqueById(int saqueId);
    }
}
