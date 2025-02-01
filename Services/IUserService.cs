using SkillHub.Data.Entities;
namespace SkillHub.Services
{
    public interface IUserService
    {
        //Task<List<User>> getAllUsersAsync();
        Task<User> CreateUserAsync(User user);
        Task<User> GetUserByEmailAsync(string email);
        Task<User> LoginUserAsync(LoginReq loginReq);
        Task<bool> UpdateUserAsync(User user);
        Task<List<User>> GetAllUsersAsync();
        Task DeleteUserAsync(int id);
        Task <User> GetUserByIdAsync(int userId);
        Task<bool> UpdateUserAsync(int userId, User updatedUser);
    }
}
