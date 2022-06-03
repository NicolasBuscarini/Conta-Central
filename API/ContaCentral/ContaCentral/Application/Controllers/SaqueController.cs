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
    public class SaqueController : ControllerBase
    {

        private readonly ISaqueService _saqueService;

        public SaqueController(ISaqueService saqueService)
        {

            _saqueService = saqueService;
        }

        [HttpPost("sacar")]
        public async Task<ActionResult> Sacar([FromBody] SacarDTO sacarDTO)
        {
            try
            {
                return Ok(await _saqueService.Sacar(sacarDTO));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("list-saques-by-carteira-id")]
        public async Task<ActionResult> ListSaquesByCarteiraId([FromQuery] int carteiraId)
        {
            try
            {
                List<Saque> list = await _saqueService.ListSaquesByCarteiraId(carteiraId);

                return Ok(list);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("saque-by-id")]
        public async Task<ActionResult> SaqueById([FromQuery] int saqueId)
        {
            try
            {
                Saque saque = await _saqueService.SaqueById(saqueId);

                return Ok(saque);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
