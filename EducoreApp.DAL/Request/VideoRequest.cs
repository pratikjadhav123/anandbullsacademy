using System.ComponentModel.DataAnnotations;

namespace EducoreApp.DAL.Request
{
    public class VideoRequest
    {
        [Required]
        public int TopicId { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string VideoUrl { get; set; } = string.Empty;
    }
}