using Microsoft.EntityFrameworkCore;
using CypressE2ETest.Models;

namespace CypressE2ETest.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Booking> Bookings { get; set; }  // <- tilføjet
    }
}
