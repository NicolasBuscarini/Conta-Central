using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContaCentral.Domain.Models.DTOs
{
    public class GerarRelatorioDTO
    {
        public int CarteiraId { get; set; }
        public int Ano{ get; set; }
    }
}
