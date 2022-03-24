using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Models;

namespace Projekat.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PicerijaController : ControllerBase    
    {
       public PicerijaContext Context {get; set;}
       
       public PicerijaController (PicerijaContext context)
       {
           Context = context;
       }

       //Picerija

       [Route("PreuzmiPiceriju")] 
       [HttpGet]

       public async Task<List<Picerija>> PreuzmiPiceriju () 
       {
           return await Context.Picerije.Include(p => p.Stolovi)
                               .Include(p => p.Porudzbine)
                               .ToListAsync();
       }

       [Route("UpisiPiceriju")] 
       [HttpPost]

       public async Task UpisiPiceriju ([FromBody] Picerija pic)

       {
           Context.Picerije.Add(pic);
           await Context.SaveChangesAsync();
       }

        [Route("IzmeniPiceriju")] 
        [HttpPut]

        public async Task IzmeniPiceriju ([FromBody] Picerija pic)
        {
            Context.Picerije.Update(pic);
            await Context.SaveChangesAsync();
        }

        [Route("ObrisiPiceriju/{id}")]
        [HttpDelete]

        public async Task ObrisiPiceriju(int id) 
        {
            var pic = await Context.Picerije.FindAsync(id);

            if (pic != null)
            {
                Context.Picerije.Remove(pic);
                await Context.SaveChangesAsync();

            }
            else
            {
                BadRequest("Ne postoji tražena picerija!");
            }

        }

        //Sto

        [Route("ZauzmiSto/{id}")] 
        [HttpPost]

        public async Task ZauzmiSto (int id, [FromBody] Sto sto)
        {
           var pic = await Context.Picerije.FindAsync(id);
           sto.Picerija = pic;

           var stol = await Context.Stolovi.Where(s => s.BrojStola == sto.BrojStola && s.Picerija.IDPicerije == id).FirstOrDefaultAsync();

           if (stol != null)
           {
               BadRequest("Nije moguće zauzeti sto!");
           }

           else 
           {
               Context.Stolovi.Add(sto);
               await Context.SaveChangesAsync();
           }

        }

        [Route("OslobodiSto/{br}/{id}")] 
        [HttpDelete]

        public async Task OslobodiSto(int br, int id)
        {
            var sto = await Context.Stolovi.Where(s => s.BrojStola == br &&  s.Picerija.IDPicerije == id).FirstOrDefaultAsync();
            Context.Stolovi.Remove(sto);
            await Context.SaveChangesAsync();
               
        }

        [Route("IzmeniSto/{br}/{ime}/{prezime}/{kapacitet}")] 
        [HttpPut]

        public async Task IzmeniSto(int br, string ime, string prezime, int kapacitet)
        {
            var sto = await Context.Stolovi.Where( s => s.BrojStola == br).FirstOrDefaultAsync(); 

            if (sto != null)
           {
               sto.Ime = ime;
               sto.Prezime = prezime;
               sto.TrenutniKapacitetStola = kapacitet;
               await Context.SaveChangesAsync();
           }

           else
           {
               BadRequest("Ne postoji traženi sto!");
           }

        }

        //Porudzbine

        [Route("DodajPorudzbinu/{id}")] 
        [HttpPost]

        public async Task DodajPorudzbinu (int id, [FromBody] Porudzbina por)
        {
            var pic = await Context.Picerije.FindAsync(id);
            por.Picerija = pic;
            Context.Porudzbine.Add(por);           
            await Context.SaveChangesAsync();
        }

        [Route("OtkaziPorudzbinu/{br}")] 
        [HttpDelete]

        public async Task OtkaziPorudzbinu (int br)
        {
            var por = await Context.Porudzbine.Where(p => p.IDPorudzine == br).FirstOrDefaultAsync();
            Context.Porudzbine.Remove(por);
            await Context.SaveChangesAsync();
        }

        [Route("IzmeniPorudzbinu/{br}/{jelovnik}/{napici}")] 
        [HttpPut]

        public async Task IzmeniPorudzbinu (int br, string jelovnik, string napici)
        {
            var por = await Context.Porudzbine.Where(p => p.IDPorudzine == br).FirstOrDefaultAsync();  
            por.Jelovnik = jelovnik;
            por.Napici = napici;
            await Context.SaveChangesAsync();
        }

    }
    
}