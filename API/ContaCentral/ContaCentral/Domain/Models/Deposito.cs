using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ContaCentral.Domain.Models
{
    public class Deposito
    {
        public int Id { get; set; }
        public decimal Valor { get; set; }
        public DateTime DataHora { get; set; }
        public string Descricao { get; set; }
        public string externalName { get; set; }
        public int externalId { get; set; }

        public int CarteiraId { get; set; }
        [ForeignKey("CarteiraId")]
        public Carteira Carteira { get; set; }
    }
}
