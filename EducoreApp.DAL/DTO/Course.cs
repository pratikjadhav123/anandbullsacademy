using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EducoreApp.DAL.DTO
{
    public class Course
    {
        [Key]
        public int CourseId { get; set; }
        public int MainCourseId { get; set; }

        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int Price { get; set; }
        [NotMapped]

        public DateTime PaymentDate { get; set; }
        [NotMapped]
        public DateTime ExpiredDate { get; set; }
        [NotMapped]
        public string? Status { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}