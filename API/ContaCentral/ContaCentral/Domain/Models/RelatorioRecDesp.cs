using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ContaCentral.Domain.Models.Relatorios
{
    public class RelatorioRecDesp
    {
        public int CarteiraId { get; set; }
        public int Ano { get; set; }
        public int Mes { get; set; }
        public decimal Receita { get; set; }
        public decimal Despesa { get; set; }
        public decimal Total { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}