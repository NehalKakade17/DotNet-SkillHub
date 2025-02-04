using SkillHub.Data.Entities;
using SkillHub.DTO;

namespace SkillHub.Services.Interface
{
    public interface IUserServiceAuth
    {
        Task<User> GetUserByEmailAsync(string email);
        AuthenticateResponse Authenticate(AuthenticateRequest model);
    }
}
