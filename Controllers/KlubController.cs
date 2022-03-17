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
    public class KlubController : ControllerBase
    {
        
        public PikadoContext Context { get; set; }
        
        public KlubController(PikadoContext context)
        {
            this.Context=context;
        }
        [Route("DodavanjeKluba/{ime}/{sajt}/{mejl}/{mesto}")]
       [HttpPost]
       public async Task<ActionResult> DodavanjeKluba(String ime,String sajt,String mejl,String mesto)
       {
           if(string.IsNullOrWhiteSpace(ime) || ime.Length>50)
           {
               return BadRequest("Greska pirlikom unosenja imena");
           }
           if(string.IsNullOrWhiteSpace(sajt) || sajt.Length>50 || !(sajt.Contains(".rs") || sajt.Contains(".com")))
           {
               return BadRequest("Greska prilikom unosenja sajta");
           }
           if(string.IsNullOrWhiteSpace(mejl) || mejl.Length>50 || !(mejl.Contains('@')))
           {
               return BadRequest("Greska prilikom unosenja mail-a");
           }
           if(string.IsNullOrWhiteSpace(mesto) || mesto.Length>50)
           {
               return BadRequest("Greska pirlikom unosenja mesta");
           }

           try
           {
               var k  = new Klub();
               k.Ime = ime;
               k.Sajt =sajt;
               k.Mejl = mejl;
               k.Mesto = mesto;
               Context.Klubovi.Add(k);
               await Context.SaveChangesAsync();
               return Ok("Klub je uspesno dodat");
           }
           catch(Exception e)
           {
               return BadRequest(e.Message);
           }
       }
    
        [Route("PrikaziKlub/{ime}")]
        [HttpGet]
        public async Task<ActionResult> PrikaziClanoveKluba(String ime)
        {
            if(string.IsNullOrWhiteSpace(ime) || ime.Length>50)
            {
                return BadRequest("Pogresno ime kluba");
            }
            try
            {
                    /*var klubovi =  Context.Klubovi.Include(p => p.igraciKluba); */
                    var klub = await Context.Klubovi.Where(k => k.Ime==ime).ToListAsync();
                    
                    return Ok
                    (
                        klub.Select(k=> 
                            
                                new
                                {
                                    Ime = k.Ime,
                                    Mail = k.Mejl,
                                    Mesto = k.Mesto
                                }
                            
                        ).ToList()
                    );
                
            }
                catch(Exception e)
                {
                return BadRequest(e.Message);
                }
        }
        
        [Route("DodavanjeIgracaUKlub/{brojRegistacijeIgraca}/{nazivKluba}")]
        [HttpPost]
        public async Task<ActionResult> DodajIgracaUKlub(int brojRegistacijeIgraca,String nazivKluba)
        {
            if(brojRegistacijeIgraca<=0)
            {
                return BadRequest("Nevalidan broj registracije igraca");
            }
            if(string.IsNullOrWhiteSpace(nazivKluba) || nazivKluba.Length>50)
            {
                return BadRequest("Nevalidno ime kluba");
            }
            try
            {
                    var klub = Context.Klubovi.Where(k => k.Ime == nazivKluba).FirstOrDefault();
                    if(klub== null)
                    {
                        return BadRequest("Ne postoji klub sa unetim imenom");
                    }
                    var igrac = Context.Igraci.Where(i => i.brojRegistracije==brojRegistacijeIgraca).FirstOrDefault();
                    if(igrac == null)
                    {
                        return BadRequest("Ne postoji igrac sa unetim brojem registracije");
                    }

                    igrac.klubIgraca=klub;
                    Context.Igraci.Update(igrac);
                    await Context.SaveChangesAsync();
                    return Ok($"Igrac {igrac.Ime} {igrac.Prezime} dodat u klub {klub.Ime}");


            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        /*[Route("ObrisiKlub/{ime}")]
        [HttpDelete]
        public async Task<ActionResult> ObrisiKlub(String ime)
        {
            if(string.IsNullOrWhiteSpace(ime) || ime.Length>50)
            {
                return BadRequest("Nevalidno uneto ime kluba");
            }
            try
            {
                var klub = Context.Klubovi.Where(k => k.Ime==ime);

                Context.Remove(klub);
                await Context.SaveChangesAsync();
                return Ok("Klub uspesno obrisan");
            }
            catch(Exception e)
            {
                return BadRequest(e);
            }
        }*/
    }
}