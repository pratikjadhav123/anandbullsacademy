using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EducoreApp.DAL.Request
{
    public class UpdateProfileRequest
    {
        [Required]
        public string FirstName { get; set; } = String.Empty;

        [Required]
        public string LastName { get; set; } = String.Empty;

        [Required, EmailAddress]
        public string Email { get; set; } = String.Empty;

        [Required, RegularExpression(@"^\+91[1-9]\d{9}$", ErrorMessage = "Mobile number should be (+91986543210) in this formate")]
        public string Mobile { get; set; } = String.Empty;

        public IFormFile? Avatar { get; set; }

    }
}
