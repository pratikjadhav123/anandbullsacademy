using Dapper;
using EducoreApp.DAL.Database;
using EducoreApp.DAL.DTO;
using EducoreApp.DAL.Interface;
using EducoreApp.DAL.Request;

namespace EducoreApp.DAL.Services
{
    public class TopicService : ITopic
    {
        private DatabaseConnection connection;

        public TopicService(DatabaseConnection connection)
        {
            this.connection = connection;
        }

        public async Task<IEnumerable<Topic>> GetTopics()
        {
            return await Task.Run(async () =>
            {
                using (var con = this.connection.connection())
                {
                    IEnumerable<Topic> topics = (await con.QueryAsync<Topic>("Select * from Topics")).ToList();
                    return topics;
                }
            });
        }

        public async Task<Topic> GetTopic(int TopicId)
        {
            return await Task.Run(async () =>
            {
                using (var con = this.connection.connection())
                {
                    Topic Topic = await con.QueryFirstOrDefaultAsync<Topic>("Select * from Topics where TopicId=@TopicId", new { TopicId });
                    return Topic;
                }
            });
        }

        public async Task<Topic> SaveTopic(TopicRequest TopicRequest)
        {
            return await Task.Run(async () =>
            {
                Topic Topic = new Topic();

                Topic.CourseId = TopicRequest.CourseId;
                Topic.Name = TopicRequest.Name;

                string query = "Insert into Topics OUTPUT inserted.* values(@CourseId,@Name,@CreatedAt,@UpdatedAt)";

                using (var con = this.connection.connection())
                {
                    Topic topic = await con.QueryFirstOrDefaultAsync<Topic>(query, Topic);
                    return topic;
                }
            });
        }

        public async Task<Topic> UpdateTopic(Topic Topic, TopicRequest TopicRequest)
        {
            return await Task.Run(async () =>
            {
                Topic.Name = TopicRequest.Name;
                Topic.CourseId = TopicRequest.CourseId;
                Topic.UpdatedAt = DateTime.Now;

                string query = "Update Topics set CourseId=@CourseId,Name=@Name,UpdatedAt=@UpdatedAt" +
                               " where TopicId=@TopicId";

                using (var con = this.connection.connection())
                {
                    await con.QueryFirstOrDefaultAsync<Topic>(query, Topic);
                    return Topic;
                }
            });
        }

        public async Task<Topic> DeleteTopic(Topic Topic)
        {
            return await Task.Run(async () =>
            {
                using (var con = this.connection.connection())
                {
                    await con.QueryFirstOrDefaultAsync<Topic>("Delete Topics where TopicId=@TopicId", Topic);
                    return Topic;
                }
            });
        }

        public async Task<IEnumerable<Topic>> GetTopicsOfCourse(int CourseId)
        {
            return await Task.Run(async () =>
            {
                using (var con = this.connection.connection())
                {
                    IEnumerable<Topic> topics = (await con.QueryAsync<Topic>("Select * from Topics where CourseId=@CourseId", new { CourseId })).ToList();
                    return topics;
                }
            });
        }
    }
}