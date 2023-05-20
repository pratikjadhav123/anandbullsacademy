using EducoreApp.DAL.DTO;
using EducoreApp.DAL.Request;

namespace EducoreApp.DAL.Interface
{
    public interface ITopic
    {
        public Task<IEnumerable<Topic>> GetTopics();

        public Task<Topic> GetTopic(int TopicId);

        public Task<Topic> SaveTopic(TopicRequest TopicRequest);

        public Task<Topic> UpdateTopic(Topic Topic, TopicRequest TopicRequest);

        public Task<Topic> DeleteTopic(Topic Topic);

        public Task<IEnumerable<Topic>> GetTopicsOfCourse(int CourseId);
    }
}