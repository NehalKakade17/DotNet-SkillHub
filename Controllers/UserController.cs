using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SkillHub.Data.Entities;
using SkillHub.Services;


namespace SkillHub.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            this._userService = userService;
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
        // POST: api/user/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginReq loginReq)
        {
            if (loginReq == null || string.IsNullOrEmpty(loginReq.Email) || string.IsNullOrEmpty(loginReq.Password))
            {
                return BadRequest("Email and password are required.");
            }

            var user = await _userService.LoginUserAsync(loginReq);

            if (user == null)
            {
                return Unauthorized("Invalid email or password.");
            }

            return Ok(user);  // Return the user or any data you want
        }
    }
}


    




    
    
        
