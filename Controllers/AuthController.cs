using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using OtpNet;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using SkillHub.Services;
using SkillHub.Models;
using Microsoft.Extensions.Configuration;
using SkillHub.Data.Entities;
namespace SkillHub.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly OtpService _otpService;
        private readonly IUserService _userService;

        public AuthController(IConfiguration configuration, IUserService userService)
        {
            _configuration = configuration;
            _userService = userService;  // Inject the user service
            _otpService = new OtpService();  // Initialize OTP service
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] RegisterUserRequest request)
        {
            if (request == null)
            {
                return BadRequest("User data is null");
            }

            // Check if the user already exists by email before creating
            var existingUser = await _userService.GetUserByEmailAsync(request.Email);
            if (existingUser != null)
            {
                return BadRequest("User already exists with this email.");
            }

            try
            {
                // Map DTO to User entity
                var user = new User
                {
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    Email = request.Email,
                    Password = request.Password,
                    Location = request.Location,
                    Designation = request.Designation,
                    Introduction = request.Introduction,
                    Skills = request.Skills,
                    Rate = request.Rate,
                    Role = request.Role,
                };

                // Generate OTP
                string otp = _otpService.GenerateOtp();
                Console.WriteLine($"Generated OTP: {otp}");

                // Store the generated OTP in the user entity
                user.Otp = otp;
                user.OtpExpiration = DateTime.Now.AddMinutes(5); // Set expiration time for OTP

                // Create the user
                var createdUser = await _userService.CreateUserAsync(user);
                if (createdUser == null)
                {
                    return BadRequest("User creation failed.");
                }

                // Save user with OTP details
                await _userService.UpdateUserAsync(createdUser);

                return Ok(new { Message = "User registered successfully. OTP sent." });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error generating or saving OTP: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }







        // Verify OTP entered by the user
        [HttpPost("verify-otp")]
        public async Task<IActionResult> VerifyOtp([FromBody] OtpVerificationRequest request)
        {
            var user = await _userService.GetUserByEmailAsync(request.Email);  // Get user from email
            if (user == null)
            {
                return Unauthorized("User not found");
            }

            // Check if OTP has expired
            if (user.OtpExpiration < DateTime.Now)
            {
                return Unauthorized("OTP has expired");
            }

            // Validate OTP entered by the user
            if (user.Otp != request.Otp)
            {
                return Unauthorized("Invalid OTP");
            }

            // If OTP is valid, proceed with user verification (clear OTP)
            user.IsVerified = true; // Set the user as verified
            user.Otp = null;        // Clear OTP after successful verification
            user.OtpExpiration = null;

            // Save user changes
            await _userService.UpdateUserAsync(user);

            return Ok(new { Message = "OTP verified successfully. User is now verified." });
        }





        // Login user (with email and password)
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginReq loginReq)
        {
            if (loginReq == null || string.IsNullOrEmpty(loginReq.Email) || string.IsNullOrEmpty(loginReq.Password))
            {
                return BadRequest("Email and password are required.");
            }

            // Call LoginUserAsync to validate user credentials
            var user = await _userService.LoginUserAsync(loginReq);
            if (user == null)
            {
                return Unauthorized("Invalid email or password.");
            }

            Console.WriteLine($"User login successful: {user.Email}");

            // Check the role of the user (assuming Role is stored as an enum or string)
            string role = user.Role.ToString();  // "Admin" or "User"

            // Return the user details along with their role
            var response = new
            {
                UserId = user.Id,
                Email = user.Email,
                Role = role,  // Return the role as a string (Admin or User)
                FirstName = user.FirstName,
                LastName = user.LastName
            };

            return Ok(response); // Return the user data
        }
        
    }
}
