using SkillHub.Data.Entities;
namespace SkillHub.Services
{
    public interface IUserService
    {
        //Task<List<User>> getAllUsersAsync();
        Task<User> CreateUserAsync(User user);
        Task<User> LoginUserAsync(LoginReq loginReq);
    }
}
