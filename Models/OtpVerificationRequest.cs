namespace SkillHub.Models
{
    public class OtpVerificationRequest
    {
        public string Email { get; set; }  // User's username or email
        public string Otp { get; set; }
    }
}
