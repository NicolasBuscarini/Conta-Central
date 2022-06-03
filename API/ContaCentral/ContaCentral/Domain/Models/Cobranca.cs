using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ContaCentral.Domain.Models
{
    public class Cobranca
    {
        public int Id { get; set; }
        public decimal Valor { get; set; }
        public string Descricao { get; set; }
        public DateTime Data { get; set; }

        public Guid FromUserId { get; set; }
        public ApplicationUser FromUser { get; set; }
        public Guid ToUserId { get; set; }
        public ApplicationUser ToUser { get; set; }

        public int FromCarteiraId { get; set; }
        public Carteira FromCarteira { get; set; }
        public int ToCarteiraId { get; set; }
        public Carteira ToCarteira { get; set; }

        public Boolean CobrancaAtiva { get; set; }
    }
}
