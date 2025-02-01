namespace SkillHub.Data.Entities
{
    public class RegisterUserRequest
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Location { get; set; }
        public string Designation { get; set; }
        public string Introduction { get; set; }
        public string Skills { get; set; }
        public decimal? Rate { get; set; }
        public Role Role { get; set; }
    }
}
