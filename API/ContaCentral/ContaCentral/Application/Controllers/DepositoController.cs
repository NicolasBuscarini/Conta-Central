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
    public class DepositoController : ControllerBase
    {
        private readonly IDepositoService _depositoService;

        public DepositoController(ICarteiraService carteiraService, IDepositoService depositoService)
        {
            _depositoService = depositoService;
        }

        [HttpPost("depositar")]
        public async Task<ActionResult> Depositar([FromBody] DepositarDTO depositarDTO)
        {
            try
            {
                return Ok(await _depositoService.Depositar(depositarDTO));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("list-depositos-by-carteira-id")]
        public async Task<ActionResult> ListDepositosByCarteiraId([FromQuery] int carteiraId)
        {
            try
            {
                List<Deposito> list = await _depositoService.ListDepositosByCarteiraId(carteiraId);

                return Ok(list);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("get-deposito")]
        public async Task<ActionResult> GetDeposito([FromQuery] int depositoId)
        {
            try
            {
                Deposito deposito = await _depositoService.GetDeposito(depositoId);

                return Ok(deposito);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
