using System.ComponentModel.DataAnnotations;

namespace SkillHub.Data.Entities
{
    public class Otp
    {
        [Key]
        public long Id { get; set; }

        [Required]
        public string OtpCode { get; set; }

        [Required]
        public string Email { get; set; }

        public Role Role { get; set; }

        [Required]
        public DateTime GeneratedOn { get; set; }

        [Required]
        public DateTime ExpiredOn { get; set; }
    }
}
