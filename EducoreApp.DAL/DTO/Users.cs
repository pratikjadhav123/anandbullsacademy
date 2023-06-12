﻿using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace EducoreApp.DAL.DTO
{
    public class Users
    {
        public int UserId { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;

        [JsonIgnore]
        public string Password { get; set; } = string.Empty;

        public string Mobile { get; set; } = string.Empty;
        public bool Active { get; set; } = true;
        public string Role { get; set; } = "User";
        public int Discounut { get; set; } = 0;

        public string Avatar { get; set; } = "user.jpg";
        [NotMapped]
        public string AvatarPath { get; set; } = string.Empty;

        public DateTime? EmailVerification { get; set; }
        public DateTime? OTPVerification { get; set; }
    }
}