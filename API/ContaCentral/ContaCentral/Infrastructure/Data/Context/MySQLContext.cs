using ContaCentral.Domain.Models;
using ContaCentral.Domain.Models.Relatorios;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;

namespace ContaCentral.Infrastructure.Data.Context

{
    public class MySQLContext : IdentityDbContext<ApplicationUser, ApplicationRole, Guid>
    {
        public MySQLContext(DbContextOptions<MySQLContext> options) : base(options)
        {
        }
        
        public DbSet<Carteira> Carteira { get; set; }
        public DbSet<Transacao> Transacao { get; set; }
        public DbSet<Deposito> Deposito { get; set; }
        public DbSet<Saque> Saque { get; set; }
        public DbSet<Transferencia> Transferencia { get; set; }
        public DbSet<Cobranca> Cobranca { get; set; }

        public DbSet<RelatorioRecDesp> RelatorioRecDesp { get; set; }

        public DbSet<ApplicationUser> User { get; set; }
        public DbSet<ApplicationRole> Role { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<RelatorioRecDesp>().HasKey(p => new {p.CarteiraId, p.Ano, p.Mes});
        }
    }
}