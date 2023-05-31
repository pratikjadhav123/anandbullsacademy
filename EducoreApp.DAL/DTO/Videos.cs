using System.ComponentModel.DataAnnotations.Schema;

namespace EducoreApp.DAL.DTO
{
    public class Videos
    {
        public int VideoId { get; set; }
        public int CourseId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string VideoUrl { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;

        [NotMapped]
        public string VideoPath { get; set; }=String.Empty;
    }
}