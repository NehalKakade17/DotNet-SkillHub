using Microsoft.EntityFrameworkCore;
using SkillHub.Data;
using SkillHub.Data.Entities;
using SkillHub.Repositories.Interfaces;
namespace SkillHub.Repositories.Implementation
{
        public class OtpRepository : IOtpRepository
        {
            private readonly UserDbContext _context;

            public OtpRepository(UserDbContext context)
            {
                _context = context;
            }
            public async Task SaveOtpAsync(Otp otp)
            {
                await _context.Otps.AddAsync(otp);
                await _context.SaveChangesAsync();
            }

        public async Task<Otp> GetOtpByEmailAsync(string email)
        {
             return await _context.Otps.Where(o => o.Email == email).OrderByDescending(o => o.GeneratedOn).FirstOrDefaultAsync();

        }
            public async Task<bool> IsOtpExpiredAsync(long otpId)
            {
                var otpRecord = await _context.Otps.FindAsync(otpId);
                return otpRecord?.ExpiredOn < DateTime.Now;
            }

            public async Task TruncateOtpTableAsync()
            {
                await _context.Database.ExecuteSqlRawAsync("TRUNCATE TABLE Otps");
            }
        }
    }

