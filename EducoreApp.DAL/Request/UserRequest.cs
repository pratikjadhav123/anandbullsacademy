using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace EducoreApp.DAL.Request
{
    public class UserRequest
    {
        [Required]
        public string FirstName { get; set; } = String.Empty;

        [Required]
        public string LastName { get; set; } = String.Empty;

        [Required, EmailAddress]
        public string Email { get; set; } = String.Empty;

        [Required]
        public string Password { get; set; } = String.Empty;

        [Required, Compare("Password", ErrorMessage = "Password and confirm password does not match")]
        public string ConfirmPassword { get; set; } = String.Empty;

        [Required,RegularExpression(@"^\+91[1-9]\d{9}$", ErrorMessage ="Mobile number should be (+91986543210) in this formate")]
        public string Mobile { get; set; } = String.Empty;

    }
    public class TempUserRequest
    {
        [Required]
        public string FirstName { get; set; } = String.Empty;

        [Required]
        public string LastName { get; set; } = String.Empty;

        [Required, EmailAddress]
        public string Email { get; set; } = String.Empty;

        [Required]
        public string Password { get; set; } = String.Empty;

        [Required, Compare("Password", ErrorMessage = "Password and confirm password does not match")]
        public string ConfirmPassword { get; set; } = String.Empty;

        [Required, RegularExpression(@"^\+91[1-9]\d{9}$", ErrorMessage = "Mobile number should be (+91986543210) in this formate")]
        public string Mobile { get; set; } = String.Empty;


    }

}