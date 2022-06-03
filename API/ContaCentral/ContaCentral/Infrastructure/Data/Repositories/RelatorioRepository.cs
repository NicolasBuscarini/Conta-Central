using ContaCentral.Domain.Models;
using ContaCentral.Domain.Models.Relatorios;
using ContaCentral.Infrastructure.Data.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContaCentral.Infrastructure.Data.Repositories
{
    public class RelatorioRepository : GenericRepository<RelatorioRecDesp, int>
    {
        private readonly MySQLContext _context;

        public RelatorioRepository(MySQLContext context) : base(context)
        {
            _context = context;
        }

        public async Task<RelatorioRecDesp> GetRelatorioRecDespByCarteiraIdAndAnoAndMes(int carteiraId, int ano, int mes)
        {
            RelatorioRecDesp relatorio = await _context.RelatorioRecDesp.Where(p => p.CarteiraId.Equals(carteiraId) && p.Ano.Equals(ano) && p.Mes.Equals(mes)).AsNoTracking().FirstOrDefaultAsync();
            return relatorio;
        }

        public async Task<List<RelatorioRecDesp>> ListRelatorioRecDespByCarteiraIdAndAno(int carteiraId, int ano)
        {
            List<RelatorioRecDesp> relatorio = await _context.RelatorioRecDesp.Where(p => p.Ano == ano && p.CarteiraId == carteiraId).ToListAsync();
            return relatorio;
        }
        public async Task<List<RelatorioRecDesp>> ListRelatorioRecDespByCarteiraIdAndAnoAndMes(int carteiraId, int ano, int meses)
        {
            List<RelatorioRecDesp> relatorio = await _context.RelatorioRecDesp.Where(p => p.Ano == ano && p.Mes < meses && p.CarteiraId == carteiraId).ToListAsync();
            return relatorio;
        }
    }
}