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
    public class SudijaController : ControllerBase
    {
        
        public PikadoContext Context { get; set; }
        
        public SudijaController(PikadoContext context)
        {
            this.Context=context;
        }
        [Route("DodavanjeSudije/{brojLicence}/{ime}/{prezime}/{mejl}")]
        [HttpPost]
        public async Task<ActionResult> DodavanjeSudije(int brojLicence,String ime,String prezime,String mejl)
        {
            if(brojLicence<=0)
            {
                return BadRequest("Nevalidan broj licence");
            }
            if(string.IsNullOrWhiteSpace(ime) || ime.Length>50)
            {
                return BadRequest("Nevalidno ime");
            }
            if(string.IsNullOrWhiteSpace(prezime) || prezime.Length>50)
            {
                return BadRequest("Nevalidno prezime");
            }
            if(string.IsNullOrWhiteSpace(mejl) || mejl.Length>50 || !(mejl.Contains('@')))
            {
                return BadRequest("Nevalidan mail");
            }
            try
            {
                var sud = Context.Sudije.Where(s => s.brojLicence==brojLicence).FirstOrDefault();
                if(sud!=null)
                {
                    return BadRequest("Vec postoji sudija sa unetim brojem licence");

                }
                else
                {
                    var sudija = new Sudija();
                    sudija.brojLicence = brojLicence;
                    sudija.Ime = ime;
                    sudija.Prezime = prezime;
                    sudija.Mejl = mejl;
                    Context.Sudije.Add(sudija);
                    await Context.SaveChangesAsync();
                    return Ok($"Sudija {sudija.Ime} {sudija.Prezime} uspesno dodat");
                }
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        
        
        [Route("IzmeniMailSudije/{brojLicence}/{noviMail}")]
        [HttpPut] 
        public async Task<ActionResult> IzmeniMailSudije(int brojLicence, String noviMail)
        {
            if(brojLicence<=0)
            {
                return BadRequest("Nevalidan idSudije");
            }
            if(string.IsNullOrWhiteSpace(noviMail) || noviMail.Length>50)
            {
                return BadRequest("Nevalidan mail");
            }
            try
            {
                var sudija = Context.Sudije.Where(s => s.brojLicence==brojLicence).FirstOrDefault();
                if(sudija==null)
                {
                    return BadRequest("Ne postoji sudija sa unetim brojem licence");
                }
                else
                {
                    sudija.Mejl=noviMail;
                    Context.Sudije.Update(sudija);
                    await Context.SaveChangesAsync();
                    return Ok("Uspesno izmenjen mail sudije");
                }

            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Route("ObrisiSudiju/{brLicence}")]
        [HttpDelete]
        public async Task<ActionResult> ObrisiSudiju(int brLicence)
        {
            if(brLicence<=0)
            {
                return BadRequest("Nevalidan broj licence");
            }
            try
            {   var sudija = Context.Sudije.Where(s => s.brojLicence==brLicence).FirstOrDefault();
                if(sudija==null)
                {
                     return BadRequest("Ne postoji sudija sa unetim brojem licence");
                }
                else
                {
                    Context.Sudije.Remove(sudija);
                    //return Ok("Obrisao sudiju");
                    await Context.SaveChangesAsync();
                    return Ok("Sudija uspesno obrisan"); // An error occurred while updating the entries. See the inner exception for details.
                    // I pored dodavanja "JsonIgnore" javlja ovu gresku 
                    // Ispravno radi samo ako brise sudiju koji nije povezan sa ostalim tabelama
                }
              
            }
            catch(Exception e)
            {
                return BadRequest(e.InnerException);
            }
        }
        
    }
}