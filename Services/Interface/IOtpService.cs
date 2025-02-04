using SkillHub.Data.Entities;
namespace SkillHub.Services.Interface
{
    public interface IOtpService
    {
        Task<string> GenerateOtpAsync(string email, Role role);
        Task<bool> ValidateOtpAsync(string email, string otp);
        Task<bool> IsOtpExpiredAsync(long otpId);
    }
}
