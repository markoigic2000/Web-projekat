using Microsoft.EntityFrameworkCore;

namespace Models
{
    public class PikadoContext : DbContext
    {
        public DbSet<Igrac> Igraci  { get; set; }

        public DbSet<Klub> Klubovi { get; set; }

        public DbSet<Turnir> Turniri { get; set; }

        public DbSet<Sudija> Sudije { get; set; }

        public DbSet<Mec> Mecevi { get; set; }

        public PikadoContext(DbContextOptions options)
            :base(options)
        {}

        
    }
}