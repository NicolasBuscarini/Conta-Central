using ContaCentral.Domain.Models;
using ContaCentral.Domain.Models.DTOs;
using ContaCentral.Domain.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContaCentral.Application.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class RelatorioController : ControllerBase
    {
        private readonly IRelatorioService _relatorioService;

        public RelatorioController(IRelatorioService relatorioService)
        {
            _relatorioService = relatorioService;
        }

        [HttpPost("gerar-relatorio-by-carteira")]
        public async Task<ActionResult> GerarRelatorioMensalByCarteira([FromBody] GerarRelatorioDTO relatorio)
        {
            try
            {
                return Ok(await _relatorioService.GerarRelatorioRecDespMensalByCarteiraIdAndAno(relatorio.CarteiraId, relatorio.Ano));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("gerar-relatorio-by-user")]
        public async Task<ActionResult> GerarRelatorioMensalByUser([FromBody] int ano)
        {
            try
            {
                return Ok(await _relatorioService.GerarRelatorioRecDespMensalByCurrentUserAndAno(ano));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("get-relatorio-by-carteira")]
        public async Task<ActionResult> GetRelatorioMensalByCarteira([FromQuery] int carteiraId, int ano)
        {
            try
            {
                RelatorioRecDespDTO relatorioMensal = await _relatorioService.GetRelatorioRecDespMensalByCarteiraIdAndAno(carteiraId, ano);

                return Ok(relatorioMensal);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("get-relatorio-by-user")]
        public async Task<ActionResult> GetRelatorioMensalByUser([FromQuery] int ano)
        {
            try
            {
                List<RelatorioRecDespDTO> relatorioMensal = await _relatorioService.GetRelatorioRecDespMensalByCurrentUserAndAno(ano);

                return Ok(relatorioMensal);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("list-relatorio-anos-disponiveis")]
        public async Task<ActionResult> ListRelatorioAnosDisponiveis()
        {
            try
            {
                List<int> relatorioMensal = await _relatorioService.ListRelatorioAnosDisponiveis();

                return Ok(relatorioMensal);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("list-anos-disponiveis-to-create-relatorio")]
        public async Task<ActionResult> ListAnosDisponiveisToCreateRelatorio()
        {
            try
            {
                List<int> relatorioMensal = await _relatorioService.ListAnosDisponiveisToCreateRelatorio();

                return Ok(relatorioMensal);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
