using System.ComponentModel.DataAnnotations;

namespace EducoreApp.DAL.Request
{
    public class CourseRequest
    {
        [Required]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;
    }
}