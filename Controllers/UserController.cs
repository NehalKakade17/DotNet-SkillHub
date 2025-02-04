using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SkillHub.Data.Entities;
using SkillHub.Services.Interface;
using SkillHub.Services;
using SkillHub.DTO;


namespace SkillHub.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserServiceAuth _userServiceAuth;
        private readonly IOtpService _otpService;
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            this._userService = userService;
        }
        public UserController(IUserServiceAuth userServiceAuth)
        {
            this._userServiceAuth = userServiceAuth;
        }
        public UserController(IOtpService otpService)
        {
            this._otpService = otpService;
        }

        /*[HttpGet("all")]
        public async Task<IActionResult> getStudents()
        {
            var users = await _userService.getAllUsersAsync();
            return Ok(users);

        }*/
        // POST: api/user
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] User user)
        {
            if (user == null)
            {
                return BadRequest("User data is null");
            }

            // Call the CreateUserAsync method to save the user
            var createdUser = await _userService.CreateUserAsync(user);

            return Ok(createdUser);
        }

        // POST: api/user/login
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
        // GET: api/users
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userService.GetAllUsersAsync();
            if (users == null || users.Count == 0)
            {
                return NotFound("No users found.");
            }
            return Ok(users); // This will return the list of users
        }

        // DELETE: api/users
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            try
            {
                await _userService.DeleteUserAsync(id); // Call the service method to delete the user
                return Ok(new { message = "User deleted successfully." });
            }
            catch (Exception ex)
            {
                return NotFound(new { message = ex.Message }); // Return a NotFound if user is not found
            }


        }
        // GET: api/User/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
            {
                return NotFound("User not found");
            }
            return Ok(user); // Return the user data
        }

        // PUT: api/User/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] User updatedUser)
        {
            if (id != updatedUser.Id)
            {
                return BadRequest("User ID mismatch");
            }

            var result = await _userService.UpdateUserAsync(id, updatedUser);

            if (!result)
            {
                return NotFound("User not found");
            }

            return NoContent(); // No content means successful update without response body
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> ValidateAsync(AuthenticateRequest model)
        {
            var response = _userServiceAuth.Authenticate(model);
            if (response == null)
            {
                return BadRequest(new { message = "Invalid email or password." });
            }
            try
            {

                var otpCode = await _otpService.GenerateOtpAsync(response.Email, response.Role);
                return Ok(new { message = "Authentication successful. OTP has been sent to your email.", otpCode });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error sending OTP: " + ex.Message });
            }
        }
    }
}


    




    
    
        
