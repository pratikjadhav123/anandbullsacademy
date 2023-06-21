using System.ComponentModel.DataAnnotations;

namespace EducoreApp.DAL.Request
{
    public class CourseRequest
    {
        public int MainCourseId { get; set; } = 0;
        [Required]
        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;
        [Required]
        public int Price { get; set; }

    }
}