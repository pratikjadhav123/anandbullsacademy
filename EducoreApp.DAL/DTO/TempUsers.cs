using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace EducoreApp.DAL.DTO
{
    public class TempUsers
    {
        public int UserId { get; set; }
        public string FirstName { get; set; } = String.Empty;
        public string LastName { get; set; } = String.Empty;
        public string Email { get; set; } = String.Empty;

        [JsonIgnore]
        public string Password { get; set; } = String.Empty;

        public string Mobile { get; set; } = String.Empty;
        public int OTP { get; set; }
    }
}
