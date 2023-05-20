namespace EducoreApp.DAL.DTO
{
    public class Videos
    {
        public int VideoId { get; set; }
        public int TopicId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string VideoUrl { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}