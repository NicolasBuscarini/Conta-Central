using ContaCentral.Domain.Models;
using ContaCentral.Infrastructure.Data.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContaCentral.Infrastructure.Data.Repositories
{
    public class SaqueRepository : GenericRepository<Saque, int>
    {
        private readonly MySQLContext _context;

        public SaqueRepository(MySQLContext context) : base(context)
        {
            _context = context;
        }

        public async Task<List<Saque>> ListSaques()
        {
            List<Saque> list = await _context.Saque.ToListAsync();

            return list;
        }
        public async Task<List<Saque>> ListSaquesByCarteiraId(int carteiraId)
        {
            List<Saque> list = await this._context.Saque
            .Where(p => p.CarteiraId.Equals(carteiraId))
            .OrderBy(p => p.DataHora).ToListAsync();

            return list;
        }

    }
}
