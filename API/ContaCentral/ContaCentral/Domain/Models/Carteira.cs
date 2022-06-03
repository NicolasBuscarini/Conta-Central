using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ContaCentral.Domain.Models
{
    public class Carteira
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public decimal Saldo { get; set; }
        public Boolean Ativo { get; set; }
        public Boolean Principal { get; set; }
        public Guid UserId { get; set; }
        public ApplicationUser User { get; set; }

        [JsonIgnore]
        public List<Transacao> ListaTransacao { get; set; }

    }
}