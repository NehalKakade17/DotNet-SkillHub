﻿using Microsoft.Extensions.Options;
using SkillHub.Repositories.Interfaces;
using SkillHub.SmtpSetting;
using SkillHub.Services.Interface;
using SkillHub.Data.Entities;

namespace SkillHub.Services.Implementation
{
    public class OtpService : IOtpService
    {

        private readonly IOtpRepository _otpRepository;
        private readonly IEmailService _emailService;
        private readonly SmtpSettings _smtpSettings;

        public OtpService(IOtpRepository otpRepository, IEmailService emailService, IOptions<SmtpSettings> smtpSettings)
        {
            _otpRepository = otpRepository;
            _emailService = emailService;
            _smtpSettings = smtpSettings.Value;
        }

        public async Task<string> GenerateOtpAsync(string email, Role role)
        {
            var otpCode = new Random().Next(100000, 999999).ToString();

            var otp = new Otp
            {
                OtpCode = otpCode,
                Email = email,
                Role = role,
                GeneratedOn = DateTime.Now,
                ExpiredOn = DateTime.Now.AddMinutes(3)
            };

            await _otpRepository.SaveOtpAsync(otp);

            // Send OTP to user's email
            bool emailSent = await _emailService.SendEmailAsync(email, "TrustVault 2FA Code ", $"Your OTP for TrustVault 2FA is: {otpCode} Valid for next 3 mins!!!");
            if (emailSent)
            {
                Console.WriteLine($"OTP sent successfully to: {email}");
                return otpCode;
            }
            else
            {
                throw new Exception("Failed to send OTP email.");
            }
        }

        public async Task<bool> ValidateOtpAsync(string email, string otp)
        {
            var otpRecord = await _otpRepository.GetOtpByEmailAsync(email);
            if (otpRecord != null && otpRecord.OtpCode == otp && otpRecord.ExpiredOn >= DateTime.Now)
            {
                return true;
            }

            return false;
        }

        public async Task<bool> IsOtpExpiredAsync(long otpId)
        {
            return await _otpRepository.IsOtpExpiredAsync(otpId);
        }


    }
}
