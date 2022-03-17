using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Models;

namespace _17640Projekat.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class IgracController : ControllerBase
    {
        
        public PikadoContext Context { get; set; }
        
        public IgracController(PikadoContext context)
        {
            this.Context=context;
        }

        [Route("DodavanjeIgraca/{regIgraca}/{ime}/{prezime}/{mejl}/{datumRodjenja}")]
        [HttpPost]
        public async Task<ActionResult> DodavanjeIgraca(int regIgraca,String ime,String prezime,String mejl,DateTime datumRodjenja)
        {
            if(string.IsNullOrWhiteSpace(ime) || ime.Length>50)
            {
                return BadRequest("Greska prilikom unosenja imena");
            }
            if(string.IsNullOrWhiteSpace(prezime) || prezime.Length>50)
            {
                return BadRequest("Greska pirlikom unosenja prezimena");
            }
            if(string.IsNullOrWhiteSpace(mejl) || mejl.Length>50 || !mejl.Contains('@'))
            {
                return BadRequest("Greska prilikom unosenja mail-a");
            }
            if(datumRodjenja>DateTime.Now)
            {
                return BadRequest("Greska prilikom unosenja datuma");
            }
            try
            {
                var i = new Igrac();
                i.brojRegistracije = regIgraca;
                i.Ime = ime;
                i.Prezime = prezime;
                i.Mail = mejl;
                i.datumRodjenja = datumRodjenja;

                Context.Igraci.Add(i);
                await Context.SaveChangesAsync();
                return Ok($"Igrac {i.Ime} {i.Prezime} je dodat " );
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        /*[Route("ObrisiIgraca/{brojReg}")]
        [HttpDelete]
        public async Task<ActionResult> ObrisiIgraca(int brojReg)
        {
            try
            {
                var igrac = Context.Igraci.Where(i => i.brojRegistracije==brojReg).FirstOrDefault();
                if(igrac==null)
                {
                    return BadRequest("Ne postoji igrac sa unetim brojem registracije");
                }
                else
                {
                    Context.Igraci.Remove(igrac);
                    await Context.SaveChangesAsync();
                    return Ok("Uspeno obrisan igrac");
                }
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }*/
        [EnableCors("CORS")]
        [Route("PrikazPoBrojuBodova/{brojbodova}")]
        [HttpGet]
        public async Task<ActionResult> PrikazPoBrojuBodova(int brojbodova)
        {
            try
            {
                var igraci = await Context.Igraci
                                            .Where(i => i.osvojeniBodovi>=brojbodova)
                                            .ToListAsync();

                return Ok(
                    igraci.Select(i => 
                    new{
                        Ime = i.Ime,
                        Prezime = i.Prezime,
                        Bodovi = i.osvojeniBodovi/*,
                        Turniri = i.osvojeniTurniri*/
                    }).ToList()
                );
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Route("PrikazPoBrojuTurnira/{brojturnira}")]
        [HttpGet]
        public async Task<ActionResult> PrikazPoBrojuTurnira(int brojturnira)
        {
            try
            {
                var igraci= await Context.Igraci/*.Include(i => i.turniriIgraca)*/
                                            .Where(i => i.osvojeniTurniri>=brojturnira)
                                            .ToListAsync();
                
                return Ok(
                    igraci.Select(i => 
                    new {
                        Ime = i.Ime,
                        Prezime = i.Prezime,
                        Bodovi = i.osvojeniBodovi,
                        Osvojeni = i.osvojeniTurniri,
                        /*Turniri = i.turniriIgraca.Select(t => 
                        new{
                            Naziv = t.Naziv
                        })*/

                    }).ToList()
                );
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
