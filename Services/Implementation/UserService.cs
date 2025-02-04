using Microsoft.IdentityModel.Tokens;
using SkillHub.Data.Entities;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using SkillHub.DTO;
using SkillHub.Helper;
using SkillHub.Services.Interface;
using SkillHub.Repositories.Interfaces;

namespace SkillHub.Services.Implementation
{
    public class UserService : IUserServiceAuth
    {
        private readonly IUserRepository _userRepository;
        private readonly AppSettings _appSettings;
    
    public AuthenticateResponse? Authenticate(AuthenticateRequest model)
        {
            var user = _userRepository.GetUserByEmailAsync(model.Email).Result;
            if (user == null || !BCrypt.Net.BCrypt.Verify(model.Password, user.Password))
            {
                return null;
            }
            //var token = "sdfsdf";
            var token = generteJwtToken(user);
            return new AuthenticateResponse(user, token);
        }

        public string generteJwtToken(User user)
        {
            // generate token that is valid for 7 days
            //1. Create a new instance of the JwtSecurityTokenHandler class.
            ////This class is used to create and validate JSON Web Tokens.
            ///

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes("7c1a7a3f68b3f4b29b1175c25e6313a5c02fd94b391b73f88eb4ff6079c232d7");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
        async Task<User> IUserServiceAuth.GetUserByEmailAsync(string email)
        {
            return await _userRepository.GetUserByEmailAsync(email);
        }
    }
}