using System.ComponentModel.DataAnnotations;

namespace EducoreApp.DAL.Request
{
    public class TopicRequest
    {
        [Required]
        public int CourseId { get; set; }

        [Required]
        public string Name { get; set; } = String.Empty;
    }
}