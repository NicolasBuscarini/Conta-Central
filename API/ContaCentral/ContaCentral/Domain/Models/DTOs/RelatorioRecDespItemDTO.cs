using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContaCentral.Domain.Models.DTOs
{
    public class RelatorioRecDespItemDTO
    {
        public int Periodo { get; set; } 
        public decimal Receita { get; set; }
        public decimal Despesa { get; set; }
        public decimal Total { get; set; }
    }
}
