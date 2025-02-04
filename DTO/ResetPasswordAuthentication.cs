using System.ComponentModel.DataAnnotations;

namespace SkillHub.DTO
{
    public class ResetPasswordAuthentication
    {
        [Required(ErrorMessage = "Email is required!")]
        [EmailAddress(ErrorMessage = "Invalid Email format")]
        public string Email { get; set; }

        public string ResetCode { get; set; }

        [Required(ErrorMessage = "Password must be supplied")]
        [RegularExpression(@"^(?=.*\d)(?=.*[a-z])(?=.*[#@$*]).{5,20}$", ErrorMessage = "Invalid password format!")]
        public string NewPassword { get; set; }
    }
}
