using System.Text.Json.Serialization;

namespace EducoreApp.DAL.DTO
{
    public class Users
    {
        public int UserId { get; set; }
        public string FirstName { get; set; } = String.Empty;
        public string LastName { get; set; } = String.Empty;
        public string Email { get; set; } = String.Empty;

        [JsonIgnore]
        public string Password { get; set; } = String.Empty;

        public string Mobile { get; set; } = String.Empty;
        public bool Active { get; set; } = true;
        public string Role { get; set; } = "User";
        public DateTime? EmailVerification { get; set; }
        public DateTime? OTPVerification { get; set; }
    }
}