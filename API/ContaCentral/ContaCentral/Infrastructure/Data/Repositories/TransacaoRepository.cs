using Microsoft.EntityFrameworkCore;
using ContaCentral.Domain.Models;
using ContaCentral.Infrastructure.Data.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContaCentral.Infrastructure.Data.Repositories
{
    public class TransacaoRepository : GenericRepository<Transacao, int>
    {
        private readonly MySQLContext _context;

        public TransacaoRepository(MySQLContext context) : base(context)
        {
            _context = context; 
        }

        public async Task<List<Transacao>> ListTransacao()
        {
            List<Transacao> list = await _context.Transacao.Include(p => p.Carteira).OrderBy(p => p.DataHora).ToListAsync();

            return list;
        }

        public async Task<List<Transacao>> ListTransacaoByUserId(Guid userId)
        {
            List<Transacao> list = await _context.Transacao.Where(p => p.Carteira.UserId == userId).ToListAsync();

            return list;
        }

        public async Task<List<Transacao>> ListTransacaoByCarteiraId(int carteiraId)
        {
            List<Transacao> list = await _context.Transacao.Where(p => p.CarteiraId.Equals(carteiraId)).ToListAsync();

            return list;
        }

        public async Task<List<Transacao>> ListTransacoesByUserId(Guid userId)
        {
            List<Transacao> list = await _context.Transacao
                .Where(p => p.Carteira.UserId.Equals(userId))
                .Include(p => p.Carteira)
                .OrderBy(p => p.DataHora).ToListAsync();

            return list;
        }

        public async Task<List<Transacao>> ListTransacoesByCarteiraIdAndAnoMes(int carteiraId, int ano, int mes)
        {
            List<Transacao> transacoes = await _context.Transacao
                .Where(p => p.CarteiraId.Equals(carteiraId) && p.DataHora.Year.Equals(ano) && p.DataHora.Month.Equals(mes))
                .OrderBy(p => p.DataHora).ToListAsync();

            return transacoes;
        }

        public async Task<decimal> GetDespesaSumByCarteiraIdAndAnoAndMes (int carteiraId, int ano, int mes)
        {
            decimal totalDespesa = await _context.Transacao
                .Where(p => p.CarteiraId.Equals(carteiraId) && p.DataHora.Year.Equals(ano) && p.DataHora.Month.Equals(mes) && p.Valor <= 0).SumAsync(x => x.Valor);

            return totalDespesa;
        }

        public async Task<decimal> GetReceitaSumByCarteiraIdAndAnoAndMes(int carteiraId, int ano, int mes)
        {
            decimal totalReceita = await _context.Transacao
                .Where(p => p.CarteiraId.Equals(carteiraId) && p.DataHora.Year.Equals(ano) && p.DataHora.Month.Equals(mes) && p.Valor >= 0).SumAsync(x => x.Valor);

            return totalReceita;
        }
    }
}
