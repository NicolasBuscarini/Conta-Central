using ContaCentral.Domain.Models;
using ContaCentral.Infrastructure.Data.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContaCentral.Infrastructure.Data.Repositories
{
    public class DepositoRepository : GenericRepository<Deposito, int>
    {
        private readonly MySQLContext _context;

        public DepositoRepository(MySQLContext context) : base(context)
        {
            _context = context;
        }

        public async Task<List<Deposito>> ListDepositos()
        {
            List<Deposito> list = await _context.Deposito.ToListAsync();
            
            return list;
        }

        public async Task<List<Deposito>> ListDepositosByCarteiraId(int carteiraId)
        {
            List<Deposito> list = await _context.Deposito
            .Where(p => p.CarteiraId == carteiraId)
            .OrderBy(p => p.DataHora).ToListAsync();

            return list;
        }

    }
}
