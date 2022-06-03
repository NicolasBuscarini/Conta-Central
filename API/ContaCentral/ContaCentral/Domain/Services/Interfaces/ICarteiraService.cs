using ContaCentral.Domain.Models;
using ContaCentral.Domain.Models.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContaCentral.Domain.Services.Interfaces
{
    public interface ICarteiraService
    {
        Task<Carteira> CreateCarteira(Carteira carteira);
        Task<Carteira> GetCarteiraById(int carteiraId);
        Task<List<Carteira>> SearchCarteira(SearchDTO searchDTO);
        Task<List<Carteira>> ListMinhasCarteiras();
        Task<Transacao> GetTransacao(int transacaoId);
        Task<List<Transacao>> ListTransacoesByCarteiraId(int carteiraId);
        Task<List<Transacao>> ListTransacoesByUserId();
        Task<Boolean> DesativarCarteira(int carteiraId);
        Task<Boolean> UpdateCarteiraPrincipal(int carteiraId);
    }

}
