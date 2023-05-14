using System.ComponentModel.DataAnnotations;

namespace EducoreApp.DAL.Request
{
    public class LoginRequest
    {
        [Required, EmailAddress]
        public string Email { get; set; } = String.Empty;

        [Required]
        public string Password { get; set; } = String.Empty;
    }
}