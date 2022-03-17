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
    public class MecController : ControllerBase
    {
        
        public PikadoContext Context { get; set; }
        
        public MecController(PikadoContext context)
        {
            this.Context=context;
        }
        [Route("DodajMecNaTurniru/{faza}/{kategorija}/{nazivTurnira}/{brojLicence}/{brojRegistracije1}/{brojRegistracije2}")]
        [HttpPost]
        public async Task<ActionResult> DodajMecNaTurniru(String faza,String kategorija,String nazivTurnira,int brojLicence,int brojRegistracije1,int brojRegistracije2)
        {
            if(string.IsNullOrWhiteSpace(faza) || faza.Length>30)
            {
                return BadRequest("Nevalidna faza ");
            }
            if(string.IsNullOrWhiteSpace(kategorija) || kategorija.Length>30)
            {
                return BadRequest("Nevalidna kategorija");
            }
            if(string.IsNullOrWhiteSpace(nazivTurnira) || nazivTurnira.Length>100)
            {
                return BadRequest("Nevalidno ime turnira");
            }
            if(brojLicence<=0)
            {
                return BadRequest("Nevalidan broj licence sudije");
            }
            if(brojRegistracije1<=0)
            {
                return BadRequest("Nevalidan broj registracije prvog igraca");
            }
            if(brojRegistracije2<=0)
            {
                return BadRequest("Nevalidan broj registracije drugog igraca");
            }
            try
            {
                var sudija = Context.Sudije.Where(s => s.brojLicence==brojLicence).FirstOrDefault();
                if(sudija==null)
                {
                    return BadRequest("Ne postoji sudija sa unetim brojem licence");
                }
                var turnir = Context.Turniri.Where(t => t.Naziv==nazivTurnira).FirstOrDefault();
                if(turnir==null)
                {
                    return BadRequest("Ne postoji turnir sa unetim imenom");
                }
                var i1 = Context.Igraci.Where(i1 => i1.brojRegistracije==brojRegistracije1).FirstOrDefault();
                if(i1==null)
                {
                    return BadRequest("Ne postoji igrac sa unetim brojem registracije");
                }
                var i2 = Context.Igraci.Where(i2 => i2.brojRegistracije==brojRegistracije2).FirstOrDefault();
                if(i2==null)
                {
                    return BadRequest("Ne postoji igrac sa unetim broj registracije");
                }
                var mec = new Mec();
                mec.Faza=faza;
                mec.Kategorija=kategorija;
                mec.mecNaTurniru=turnir;
                mec.sudijaNaMecu=sudija;
                mec.igraciMeca=new List<Igrac>(); 
                mec.igraciMeca.Add(i1);
                mec.igraciMeca.Add(i2);

                Context.Mecevi.Add(mec);
                await Context.SaveChangesAsync();
                return Ok("Dodat mec na turnir");
                
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }

        }
        
        [Route("PregledMecevaPoKategorijiFazi/{kat}/{faza}")]
        [HttpGet]
        public async Task<ActionResult> PregledMecevaPoKategorijiFazi(String kat,String faza)
        {
            if(string.IsNullOrWhiteSpace(kat) || kat.Length>30)
            {
                return BadRequest("Nevalidna kategorija");
            }
            if(string.IsNullOrWhiteSpace(faza) || faza.Length>30)
            {
                return BadRequest("Nevalidna faza");
            }
            try
            {
                var mec = await Context.Mecevi
                                            .Include(p=> p.igraciMeca)
                                            .Include(p=> p.sudijaNaMecu)
                                            .Include(p=> p.mecNaTurniru)
                                            .Where(m => m.Kategorija==kat && m.Faza==faza)
                                            .ToListAsync();
                
                return Ok(
                    mec.Select(m => 
                    new {
                        Faza = m.Faza,
                        Kategorija = m.Kategorija,
                        Sudija = m.sudijaNaMecu.Ime+" "+m.sudijaNaMecu.Prezime,
                        Turnir = m.mecNaTurniru.Naziv,
                        /*Igraci = m.igraciMeca.Select( i => 
                        new{
                            Ime = i.Ime,
                            Prezime = i.Prezime
                        }),*/
                       
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