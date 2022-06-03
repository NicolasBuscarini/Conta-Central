using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContaCentral.Domain.Models.DTOs
{
    public class RelatorioRecDespDTO
    {
        public int CarteiraId { get; set; }
        public int Tipo { get; set; }
        public List<RelatorioRecDespItemDTO> relatorioRecDespItems { get; set; }
    }
}
