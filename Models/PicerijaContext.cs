using Microsoft.EntityFrameworkCore;

namespace Models 
{
    public class PicerijaContext : DbContext
    {
        public DbSet<Picerija> Picerije {get; set;}
        public DbSet<Porudzbina> Porudzbine {get; set;}
        public DbSet<Sto> Stolovi {get; set;}

        public PicerijaContext(DbContextOptions options) : base(options)
        {

        }

    }
}