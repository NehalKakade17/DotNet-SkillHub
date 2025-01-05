
using Microsoft.EntityFrameworkCore;
using SkillHub.Data;
using SkillHub.Data.Entities;
namespace SkillHub.Services
{
    public class UserService : IUserService
    {
        private readonly UserDbContext _userDbContext;
        public UserService(UserDbContext userDbContext)
        {
            this._userDbContext = userDbContext;
        }
        /*public async Task<List<User>> getAllUsersAsync()
        {
            var user = await _userDbContext.Users.ToListAsync();
            return user;
        }*/
        public async Task<User> CreateUserAsync(User user)
        {
            // Add the user to the Users table
            _userDbContext.Users.Add(user);
            // Save changes to the database
            await _userDbContext.SaveChangesAsync();
            // Return the created user (with generated ID)
            return user;
        }
        public async Task<User> LoginUserAsync(LoginReq loginReq)
        {
            // Find the user by email
            var user = await _userDbContext.Users
                .FirstOrDefaultAsync(u => u.Email == loginReq.Email);

            if (user == null)
            {
                return null; // No user found
            }

            // Validate the password (Assuming plain text password, in production use hashed password)
            if (user.Password == loginReq.Password)
            {
                return user; // Successfully authenticated
            }

            return null; // Invalid password
        }
    }
}
