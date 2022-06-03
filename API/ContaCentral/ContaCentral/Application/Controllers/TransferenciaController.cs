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
    public class TransferenciaController : ControllerBase
    {
        private readonly ITransferenciaService _transferenciaService;

        public TransferenciaController(ITransferenciaService transferenciaService)
        {
            _transferenciaService = transferenciaService;
        }

        [HttpPost("transferir")]
        public async Task<ActionResult> Tranferir([FromBody] TransferirDTO transferirDTO)
        {
            try
            {
                Transferencia transferencia = await _transferenciaService.Transferir(transferirDTO);

                return Ok(transferencia);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("list-transferencias-by-carteira-id")]
        public async Task<ActionResult> ListTransferenciasByCarteiraId([FromQuery] int carteiraId)
        {
            try
            {
                List<Transferencia> list = await _transferenciaService.ListTransferenciasByCarteiraId(carteiraId);

                return Ok(list);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("get-transferencia-by-id")]
        public async Task<ActionResult> GetTransferenciaById([FromQuery] int transferenciaId)
        {
            try
            {
                return Ok(await _transferenciaService.GetTransferenciaById(transferenciaId));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
