using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace EducoreApp.DAL.Request
{
    public class VideoRequest
    {
        [Required]
        public int CourseId { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public IFormFile? Video { get; set; }
    }
}