using SkillHub.Data.Entities;

namespace SkillHub.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<User> GetUserByEmailAsync(string email);
    }
}
