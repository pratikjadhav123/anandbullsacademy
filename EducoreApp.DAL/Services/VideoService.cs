using Dapper;
using EducoreApp.DAL.Database;
using EducoreApp.DAL.DTO;
using EducoreApp.DAL.Interface;
using EducoreApp.DAL.Request;

namespace EducoreApp.DAL.Services
{
    public class VideoService : IVideos
    {
        private DatabaseConnection connection;

        public VideoService(DatabaseConnection connection)
        {
            this.connection = connection;
        }

        public async Task<IEnumerable<Videos>> GetVideos()
        {
            return await Task.Run(async () =>
            {
                using (var con = this.connection.connection())
                {
                    IEnumerable<Videos> videos = (await con.QueryAsync<Videos>("Select * from Videos")).ToList();
                    return videos;
                }
            });
        }

        public async Task<Videos> GetVideo(int VideoId)
        {
            return await Task.Run(async () =>
            {
                using (var con = this.connection.connection())
                {
                    Videos Videos = await con.QueryFirstOrDefaultAsync<Videos>("Select * from Videos where VideoId=@VideoId", new { VideoId });
                    return Videos;
                }
            });
        }

        public async Task<Videos> SaveVideos(VideoRequest videoRequest)
        {
            return await Task.Run(async () =>
            {
                Videos Videos = new Videos();
                Videos.TopicId = videoRequest.TopicId;
                Videos.Name = videoRequest.Name;
                Videos.VideoUrl = videoRequest.VideoUrl;

                string query = "Insert into Videos OUTPUT inserted.* values(@TopicId,@Name,@VideoUrl,@CreatedAt,@UpdatedAt)";

                using (var con = this.connection.connection())
                {
                    Videos videos = await con.QueryFirstOrDefaultAsync<Videos>(query, Videos);
                    return videos;
                }
            });
        }

        public async Task<Videos> UpdateVideos(Videos Videos, VideoRequest videoRequest)
        {
            return await Task.Run(async () =>
            {
                Videos.TopicId = videoRequest.TopicId;
                Videos.Name = videoRequest.Name;
                Videos.VideoUrl = videoRequest.VideoUrl;
                Videos.UpdatedAt = DateTime.Now;

                string query = "Update Videos set TopicId=@TopicId, Name=@Name, VideoUrl=@VideoUrl,UpdatedAt=@UpdatedAt" +
                               " where VideoId=@VideoId";

                using (var con = this.connection.connection())
                {
                    await con.QueryFirstOrDefaultAsync<Videos>(query, Videos);
                    return Videos;
                }
            });
        }

        public async Task<Videos> DeleteVideos(Videos Videos)
        {
            return await Task.Run(async () =>
            {
                using (var con = this.connection.connection())
                {
                    await con.QueryFirstOrDefaultAsync<Videos>("Delete Videos where VideoId=@VideoId", Videos);
                    return Videos;
                }
            });
        }

        public async Task<IEnumerable<Videos>> GetVideosByTopic(int TopicId)
        {
            return await Task.Run(async () =>
            {
                using (var con = this.connection.connection())
                {
                    IEnumerable<Videos> videos = (await con.QueryAsync<Videos>("Select * from Videos where TopicId=@TopicId", new { TopicId })).ToList();
                    return videos;
                }
            });
        }
    }
}