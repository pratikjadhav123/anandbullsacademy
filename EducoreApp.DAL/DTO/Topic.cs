namespace EducoreApp.DAL.DTO
{
    public class Topic
    {
        public int TopicId { get; set; }
        public int CourseId { get; set; }
        public string Name { get; set; } = String.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}