using Microsoft.EntityFrameworkCore;
using SkillHub.Data.Entities;
namespace SkillHub.Data
{
    public class UserDbContext : DbContext
    {
        public UserDbContext(DbContextOptions<UserDbContext> context) : base(context)
        {
        }
         // Register the DbSet for Users
        public DbSet<User> Users { get; set; }
       
    }
}
