using ContaCentral.Domain.Models;
using ContaCentral.Infrastructure.Data.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContaCentral.Infrastructure.Data.Repositories
{
    public class CobrancaRepository : GenericRepository<Cobranca, int>
    {
        private readonly MySQLContext _context;

        public CobrancaRepository(MySQLContext context) : base(context)
        {
            _context = context;
        }

        public async Task<List<Cobranca>> ListCobrancasPendentes(Guid userId)
        {
            List<Cobranca> cobrancas = await _context.Cobranca.Where(p => p.CobrancaAtiva.Equals(true) && (p.FromUserId.Equals(userId) || p.ToUserId.Equals(userId))).Include(m => m.ToUser).Include(m => m.FromUser).ToListAsync();

            return cobrancas;
        }

    }
}
