using Microsoft.EntityFrameworkCore;
using ContaCentral.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ContaCentral.Infrastructure.Data.Context;

namespace ContaCentral.Infrastructure.Data.Repositories
{
    public class UserRepository : GenericRepository<ApplicationUser, Guid>
    {

        private readonly MySQLContext _context;

        public UserRepository(MySQLContext context) : base(context)
        {
            _context = context;
        }

        public async Task<List<ApplicationUser>> ListUsers()
        {
            List<ApplicationUser> list = await _context.User.ToListAsync();

            return list;
        }

        public async Task<ApplicationUser> GetByCPFAsync(string cpf)
        {
            ApplicationUser user = await _context.User.Where(p => p.CPF.Equals(cpf)).FirstOrDefaultAsync();

            return user;
        }

    }
}