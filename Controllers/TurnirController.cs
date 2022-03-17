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
    public class TurnirController : ControllerBase
    {
        
        public PikadoContext Context { get; set; }
        
        public TurnirController(PikadoContext context)
        {
            this.Context=context;
        }
        [Route("DodavanjeTurnira/{naziv}/{Grad}/{brojbodova}/{datumodrzavanja}/{nagradnifond}")]
        [HttpPost]
        public async Task<ActionResult> DodavanjeTurnira(String naziv,String Grad,int brojbodova,DateTime datumodrzavanja,int nagradnifond)
        {
            if(string.IsNullOrWhiteSpace(naziv) || naziv.Length>100)
            {
                return BadRequest("Nevalidno ime turnira");
            }
            if(string.IsNullOrWhiteSpace(Grad) || Grad.Length>20)
            {
                return BadRequest("Nevalidan naziv grada");
            }
            if(brojbodova<10 || brojbodova>500)
            {
                return BadRequest("Nevalidan broj bodova");
            }
            if(nagradnifond<10000 || nagradnifond>500000)
            {
                return BadRequest("Nevalidan nagradni fond");
            }
            try
            {
                var t = new Turnir();
                t.Grad=Grad;
                t.brojBodova=brojbodova;
                t.Naziv = naziv;
                t.datumOdrzavanja = datumodrzavanja;
                t.nagradniFond = nagradnifond;
                Context.Turniri.Add(t);
                await Context.SaveChangesAsync();
                return Ok($"Turnir {t.Naziv} uspesno dodat");
                
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    [Route("DodavanjePobednikaTurnira/{NazivTurnira}/{brojRegistracije}")]
    [HttpPut]
    public async Task<ActionResult> DodavanjePobednikaTurnira(String NazivTurnira,int brojRegistracije)
    {
        if(string.IsNullOrWhiteSpace(NazivTurnira) || NazivTurnira.Length>100)
        {
            return BadRequest("Nevalidan nazvi turnira");
        }
        if(brojRegistracije<=0)
        {
            return BadRequest("Nevalidan broj registracije igraca");
        }
        try
        {
            var turnir = Context.Turniri.Where(t => t.Naziv==NazivTurnira).FirstOrDefault();
            if(turnir == null)
            {
                return BadRequest("Ne postoji turnir sa unetim imenom");
            }
            var igrac = Context.Igraci.Where(i => i.brojRegistracije==brojRegistracije).FirstOrDefault();
            if(igrac==null)
            {
                return BadRequest("Ne postoji igrac sa unetim brojem registracije");
            }
            turnir.Pobednik=igrac;
            igrac.osvojeniTurniri++;
            igrac.osvojeniBodovi += turnir.brojBodova;
            Context.Turniri.Update(turnir);
            Context.Igraci.Update(igrac);
            await Context.SaveChangesAsync();
            return Ok("Uspesno uneti podaci");

        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    [Route("DodavanjeOrganozatoraTurnira/{nazivTurnira}/{organizator}")]
    [HttpPut]
    public async Task<ActionResult> DodavanjeOrganizatoraTurnira(String nazivTurnira ,String organizator)
    {
        if(string.IsNullOrWhiteSpace(nazivTurnira) || nazivTurnira.Length>100)
        {
            return BadRequest("Nevalidan naziv turnira");
        }
        if(string.IsNullOrWhiteSpace(organizator) || organizator.Length>50)
        {
            return BadRequest("Nevalidno ime kluba");
        }
        try
        {
            var turnir = Context.Turniri.Where(t => t.Naziv==nazivTurnira).FirstOrDefault();
            if(turnir == null)
            {
                return BadRequest("Ne postoji turnir sa unetim imenom");
            }
            var org = Context.Klubovi.Where(k => k.Ime==organizator).FirstOrDefault();
            if(org ==null)
            {
                return BadRequest("Ne postoji klub sa unetim imenom");
            }
            turnir.organizatorTurnira=org;
            if(org.organizovaniTurniri==null)
            {
                org.organizovaniTurniri = new List<Turnir>();
            }
            org.organizovaniTurniri.Add(turnir);
            
            
            Context.Turniri.Update(turnir);
            Context.Klubovi.Update(org);

            await Context.SaveChangesAsync();
            return Ok("Uspesno dodat organizator turnira");
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    [Route("PrikazPoNagradnomFondu/{nagradnifond}")]
    [HttpGet]
    public async Task<ActionResult> PrikazPoNagradnomFondu(int nagradnifond)
    {
        if(nagradnifond<10000 || nagradnifond>500000)
        {
            return BadRequest("Nevalidan nagradni fond");
        }
        try
        {
            var tur = await Context.Turniri.Include(t => t.Pobednik)
                                            .Where(t => t.nagradniFond>=nagradnifond).ToListAsync();
            

            return Ok
            (
                tur.Select(t=> 
                new
                { 
                    Naziv = t.Naziv,
                    Grad = t.Grad,
                    BrojBodova = t.brojBodova,
                    Datum = t.datumOdrzavanja,
                    Pobednik = t.Pobednik.Ime+" "+t.Pobednik.Prezime
                }).ToList()
            );
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    [Route("PrikazPoBrojuBodova/{brojbodova}")]
    [HttpGet]
    public async Task<ActionResult> PrikazPoBrojuBodova(int brojbodova)
    {
        if(brojbodova<10 || brojbodova>500)
        {
            return BadRequest("Nevalidan broj bodova");
        }
        try
        {
            var turniri = await Context.Turniri.Include(t => t.Pobednik)
                                        .Where(t => t.brojBodova>=brojbodova)
                                        .ToListAsync();


            return Ok
            (
                turniri.Select(p => 
                new{
                    Naziv = p.Naziv,
                    Grad = p.Grad,
                    BrojBodova = p.brojBodova,
                    Datum = p.datumOdrzavanja,
                    Pobednik = p.Pobednik.Ime+" "+p.Pobednik.Prezime
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