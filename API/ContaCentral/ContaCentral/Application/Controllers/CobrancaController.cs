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
    public class CobrancaController : ControllerBase
    {
        private readonly ICobrancaService _cobrancaService;
        public CobrancaController(ICobrancaService cobrancaService)
        {
            _cobrancaService = cobrancaService;
        }

        [HttpPost("create-cobranca")]
        public async Task<IActionResult> CreateCobranca([FromBody] CobrancaDTO cobrancaDTO)
        {
            try
            {
                return Ok(await _cobrancaService.CreateCobranca(cobrancaDTO));
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("list-cobrancas-pendentes")]
        public async Task<IActionResult> ListCobrancasPendentes()
        {
            try
            {
                return Ok(await _cobrancaService.ListCobrancasPendentes());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("pagar-cobranca")]
        public async Task<IActionResult> PagarCobranca([FromQuery] int cobrancaId)
        {
            try
            {
                return Ok(await _cobrancaService.PagarCobranca(cobrancaId));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("rejeitar-cobranca")]
        public async Task<IActionResult> RejeitarCobranca([FromQuery] int cobrancaId)
        {
            try
            {
                return Ok(await _cobrancaService.RejeitarCobranca(cobrancaId));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
