
using Google.Protobuf.WellKnownTypes;
using Microsoft.EntityFrameworkCore;
using Mysqlx.Cursor;
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

        public async Task<User> GetUserByEmailAsync(string email)
        {
            // Look for a user with the provided email in the database
            return await _userDbContext.Users.FirstOrDefaultAsync(u => u.Email == email);
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
        public async Task<List<User>> GetAllUsersAsync()
        {
            // Query the Users table and return the list of users
            return await _userDbContext.Users.ToListAsync();
        }
        public async Task DeleteUserAsync(int id)
        {
            var user = await _userDbContext.Users.FindAsync(id);
            if (user != null)
            {
                _userDbContext.Users.Remove(user); // Remove user from the DbContext
                await _userDbContext.SaveChangesAsync(); // Save changes to the database
            }

        }
        // Method to fetch a user by ID
        public async Task<User> GetUserByIdAsync(int userId)
        {
            return await _userDbContext.Users.FirstOrDefaultAsync(u => u.Id == userId);
        }

        // Method to update a user's details
        public async Task<bool> UpdateUserAsync(int userId, User updatedUser)
        {
            // Fetch the existing user from the database
            var existingUser = await _userDbContext.Users.FindAsync(userId);
            if (existingUser == null)
            {
                return false; // User not found
            }

            // Update user properties
            existingUser.FirstName = updatedUser.FirstName;
            existingUser.LastName = updatedUser.LastName;
            existingUser.Email = updatedUser.Email;
            existingUser.Password = updatedUser.Password; // Store as is (no hashing)
            existingUser.Location = updatedUser.Location;
            existingUser.Designation = updatedUser.Designation;
            existingUser.Introduction = updatedUser.Introduction;
            existingUser.Skills = updatedUser.Skills;

            // Save changes
            _userDbContext.Users.Update(existingUser);
            await _userDbContext.SaveChangesAsync();

            return true; // Successfully updated
        }
        public async Task<bool> UpdateUserAsync(User user)
        {
            var existingUser = await _userDbContext.Users
                .Where(u => u.Email == user.Email)
                .FirstOrDefaultAsync();

            if (existingUser == null)
            {
                return false; // User not found
            }

            existingUser.Otp = user.Otp;
            existingUser.OtpExpiration = user.OtpExpiration;
            _userDbContext.Users.Update(existingUser);
            await _userDbContext.SaveChangesAsync();
            return true;
        }
    }
}
