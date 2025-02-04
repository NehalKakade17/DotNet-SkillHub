using SkillHub.Data.Entities;
namespace SkillHub.Repositories.Interfaces
{
    public interface IOtpRepository
    {
        Task SaveOtpAsync(Otp otp);
        Task<Otp> GetOtpByEmailAsync(string email);
        Task<bool> IsOtpExpiredAsync(long otpId);

        Task TruncateOtpTableAsync();
    }
}
