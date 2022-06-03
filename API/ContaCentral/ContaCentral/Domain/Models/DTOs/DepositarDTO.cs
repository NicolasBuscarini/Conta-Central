using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContaCentral.Domain.Models.DTOs
{
    public class DepositarDTO
    {
        public decimal Valor { get; set; }
        public string Descricao { get; set; }
        public int CarteiraId { get; set; }
        public string ExternalName { get; set; }
        public int ExternalId { get; set; }


    }
}
