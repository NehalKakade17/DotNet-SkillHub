﻿using System;
using System.Text.Json.Serialization;



namespace SkillHub.Data.Entities
{
    public class User
    {
        public int Id { get; set; }

        // First Name of the user
       
        public string FirstName { get; set; }

        // Last Name of the user
        
        public string LastName { get; set; }

        // Email (unique)
        
        
        
        public string Email { get; set; }

        // Password
        public string Password { get; set; }

        // Location (optional)
        public string? Location { get; set; }

        // Designation (optional)
        public string? Designation { get; set; }

        // Introduction (optional)
        public string? Introduction { get; set; }

        // Skills (optional)
        public string? Skills { get; set; }

        // Rate (optional)
        public decimal? Rate { get; set; }
        public Role Role { get; set; }
        [JsonIgnore]
        public string Otp { get; set; }
        [JsonIgnore]
        public DateTime? OtpExpiration { get; set; }

        public bool IsVerified { get; set; }

    }
}
