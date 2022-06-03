using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ContaCentral.Domain.Models
{
    public class Saque
    {
        public int Id { get; set; }
        public decimal Valor { get; set; }
        public DateTime DataHora { get; set; }
        public string Descricao { get; set; }

        public int CarteiraId { get; set; }
        [ForeignKey("CarteiraId")]
        public Carteira Carteira { get; set; }
    }
}
