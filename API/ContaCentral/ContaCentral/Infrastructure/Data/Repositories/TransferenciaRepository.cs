using ContaCentral.Domain.Models;
using ContaCentral.Infrastructure.Data.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContaCentral.Infrastructure.Data.Repositories
{
    public class TransferenciaRepository : GenericRepository<Transferencia, int>
    {
        private readonly MySQLContext _context;

        public TransferenciaRepository(MySQLContext context) : base(context)
        {
            _context = context; 
        }

        public async Task<List<Transferencia>> ListTransferencias()
        {
            List<Transferencia> list = await _context.Transferencia.OrderBy(p => p.DataHora).ToListAsync();

            return list;
        }

        public async Task<List<Transferencia>> ListTransferenciasByCarteiraId(int carteiraId)
        {
            List<Transferencia> list = await _context.Transferencia
                .Where(p => p.FromCarteiraId.Equals(carteiraId) || p.ToCarteiraId.Equals(carteiraId))
                .Include(p => p.ToCarteira).Include(p => p.FromCarteira).Include(p => p.FromCarteira.User)
                .OrderBy(p => p.DataHora).ToListAsync();

            return list;
        }       
    }
}
