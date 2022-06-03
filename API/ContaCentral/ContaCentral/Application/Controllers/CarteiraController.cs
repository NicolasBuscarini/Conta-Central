using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ContaCentral.Domain.Models;
using ContaCentral.Domain.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ContaCentral.Domain.Models.DTOs;

namespace ContaCentral.Application.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CarteiraController : ControllerBase
    {
        private readonly ICarteiraService _carteiraService;

        public CarteiraController(ICarteiraService carteiraService)
        {
            _carteiraService = carteiraService;
        }

        [HttpPost("create-carteira")]
        public async Task<ActionResult> CreateCarteira([FromBody] Carteira carteira)
        {
            try
            {
                return Ok(await _carteiraService.CreateCarteira(carteira));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("list-minhas-carteiras")]
        public async Task<ActionResult> ListCarteiras()
        {
            try
            {
                List<Carteira> listCarteira = await _carteiraService.ListMinhasCarteiras();

                return Ok(listCarteira);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("search-carteira")]
        public async Task<ActionResult> SearchCarteira([FromBody] SearchDTO searchDTO)
        {
            try
            {
                List<Carteira> carteiras = await _carteiraService.SearchCarteira(searchDTO);

                return Ok(carteiras);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("get-carteira")]
        public async Task<ActionResult> GetCarteiraByCarteiraId([FromQuery] int carteiraId)
        {
            try
            {
                Carteira carteira = await _carteiraService.GetCarteiraById(carteiraId);

                return Ok(carteira);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("get-transacao")]
        public async Task<ActionResult> getTransacao([FromQuery] int transacaoId)
        {
            try
            {
                Transacao transacao = await _carteiraService.GetTransacao(transacaoId);

                return Ok(transacao);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("list-transacoes")]
        public async Task<ActionResult> ListMinhasTrasacoes([FromQuery] int carteiraId)
        {
            try
            {
                List<Transacao> list = await _carteiraService.ListTransacoesByCarteiraId(carteiraId);

                return Ok(list);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("list-user-transacoes")]
        public async Task<ActionResult> ListUserTransacoes()
        {
            try
            {
                List<Transacao> list = await _carteiraService.ListTransacoesByUserId();

                return Ok(list);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("desativar-carteira")]
        public async Task<ActionResult> DesativarCarteira([FromBody] int carteiraId)
        {
            try
            {        
                return Ok(await _carteiraService.DesativarCarteira(carteiraId));
            }
            catch(Exception ex){
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("update-carteira-principal")]
        public async Task<ActionResult> UpdateCarteiraPrincipal([FromQuery] int carteiraId)
        {
            try
            {
                return Ok(await _carteiraService.UpdateCarteiraPrincipal(carteiraId));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
