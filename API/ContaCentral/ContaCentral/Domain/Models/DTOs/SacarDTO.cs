using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContaCentral.Domain.Models.DTOs
{
    public class SacarDTO
    {
        public decimal Valor { get; set; }
        public string Descricao { get; set; }

        public int CarteiraId { get; set; }
    }
}
