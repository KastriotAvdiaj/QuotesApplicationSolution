using Microsoft.EntityFrameworkCore;
using QuotesApplication.Areas.User.Models;
using QuotesApplication.Models;

namespace QuotesApplication.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options):base(options) 
        {}

        public DbSet<Quote> Quotes { get; set; }   

        public DbSet<ApplicationUser> Users { get; set; }
    }
}
