using SkillHub.Data.Entities;
using SkillHub.Data;
using SkillHub.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
namespace SkillHub.Repositories.Implementation
{
    public class UserRepository : IUserRepository
    {
        private readonly UserDbContext _context;

        public UserRepository(UserDbContext context)
        {
            _context = context;
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }
    }
}