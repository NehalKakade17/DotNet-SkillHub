using Microsoft.AspNetCore.Mvc;
using SkillHub.Services.Interface;
using System.Threading.Tasks;
using SkillHub.Models;
using SkillHub.Data.Entities;


namespace TrustVault_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OtpController : ControllerBase
    {
        private readonly IOtpService _otpService;
        private readonly IUserServiceAuth UserService;

        public OtpController(IOtpService otpService, IUserServiceAuth userService)
        {
            _otpService = otpService;
            UserService = userService;
        }


        [HttpPost("request/{email}/{role}")]
        public async Task<IActionResult> RequestOtp(string email, Role role)
        {
            if (string.IsNullOrEmpty(email) || Enum.IsDefined(role))
            {
                return BadRequest("Email and role are required.");
            }

            try
            {
                var otpCode = await _otpService.GenerateOtpAsync(email, role);
                return Ok(new { Message = "OTP sent successfully.", OtpCode = otpCode });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error sending OTP: {ex.Message}");
            }
        }

        // Verify OTP - User provides OTP and email
        [HttpPost("verify")]
        public async Task<IActionResult> VerifyOtp([FromBody] OtpVerificationRequest request)
        {
            if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Otp))
            {
                return BadRequest("Email and OTP are required.");
            }

            var isValid = await _otpService.ValidateOtpAsync(request.Email, request.Otp);
            if (isValid)
            {
                var user = await UserService.GetUserByEmailAsync(request.Email);
                return Ok(new { success = true, message = "OTP verified successfully.", role = user.Role });

            }

            return BadRequest("Invalid or expired OTP.");
        }







    }

    public class OtpVerificationRequest
    {
        public string Email { get; set; }
        public string Otp { get; set; }
    }
}
