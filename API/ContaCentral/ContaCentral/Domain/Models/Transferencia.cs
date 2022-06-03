using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ContaCentral.Domain.Models
{
    public class Transferencia
    {
        public int Id { get; set; }
        public decimal Valor { get; set; }
        public DateTime DataHora { get; set; }
        public string Descricao { get; set; }

        public int FromCarteiraId { get; set; }
        [ForeignKey("FromCarteiraId")]
        public Carteira FromCarteira { get; set; }

        public int ToCarteiraId { get; set; }
        [ForeignKey("ToCarteiraId")]
        public Carteira ToCarteira { get; set; }
    }
}
