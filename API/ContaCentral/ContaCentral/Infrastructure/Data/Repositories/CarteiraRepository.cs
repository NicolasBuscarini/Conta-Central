using Microsoft.EntityFrameworkCore;
using ContaCentral.Domain.Models;
using ContaCentral.Infrastructure.Data.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContaCentral.Infrastructure.Data.Repositories
{
    public class CarteiraRepository : GenericRepository<Carteira, int>
    {
        private readonly MySQLContext _context;

        public CarteiraRepository(MySQLContext context) : base(context)
        {
            _context = context;
        }

        public async Task<Carteira> GetCarteiraById(int carteiraId)
        {
            Carteira carteira = await _context.Carteira.Where(p => p.Id.Equals(carteiraId)).Include(l => l.ListaTransacao).FirstOrDefaultAsync();

            return carteira;
        }
        public async Task<List<Carteira>> ListMinhasCarteiras(Guid currentUserId)
        {
            List<Carteira> listCarteira = await _context.Carteira.Include(p => p.User).Where(c => c.UserId == currentUserId && c.Ativo).ToListAsync();

            return listCarteira;
        }

        public async Task<List<Carteira>> ListCarteiras()
        {
            List<Carteira> list = await _context.Carteira.Include(p => p.User).ToListAsync();

            return list;
        }

        public async Task<List<Carteira>> ListCarteirasPaginationOrderById(string searchDTO, int position, int pageSize)
        {
            List<Carteira> carteiras = await _context.Carteira.Where(p => p.Nome.Contains(searchDTO) && p.Ativo).OrderBy(p => p.Id).Skip(position).Take(pageSize).ToListAsync();

            return carteiras;
        }

        public async Task<List<Carteira>> ListCarteirasByUser(Guid currentUserId)
        {
            List<Carteira> listCarteira = await _context.Carteira.Include(p => p.User).Where(c => c.UserId == currentUserId && c.Ativo).ToListAsync();

            return listCarteira;
        }

        public async Task<Carteira> GetCarteiraPrincipal(Guid userId)
        {
            Carteira carteira = await _context.Carteira.Where(p => p.Principal && p.UserId.Equals(userId)).FirstOrDefaultAsync();
            
            return carteira;
        }
    }
}
