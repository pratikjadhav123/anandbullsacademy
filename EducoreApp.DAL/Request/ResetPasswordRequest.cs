using System.ComponentModel.DataAnnotations;

namespace EducoreApp.DAL.Request
{
    public class ResetPasswordRequest
    {
        [Required]
        public string Token { get; set; } = string.Empty;

        [Required]
        public string NewPassword { get; set; } = string.Empty;

        [Required, Compare("NewPassword", ErrorMessage = "New Password and Confirm password does not match")]
        public string ConfirmPassword { get; set; } = string.Empty;
    }
}