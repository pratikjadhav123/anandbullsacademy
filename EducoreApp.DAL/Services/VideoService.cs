using Dapper;
using EducoreApp.DAL.Database;
using EducoreApp.DAL.DTO;
using EducoreApp.DAL.Helper;
using EducoreApp.DAL.Interface;
using EducoreApp.DAL.Request;
using Newtonsoft.Json;

namespace EducoreApp.DAL.Services
{
    public class VideoService : IVideos
    {
        private DatabaseConnection connection;
        private ApiCurls apiCurls;

        public VideoService(DatabaseConnection connection, ApiCurls apiCurls)
        {
            this.connection = connection;
            this.apiCurls = apiCurls;
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

        public async Task SaveVideos()
        {
            await Task.Run(async () =>
           {
               string json = await this.apiCurls.GetResponce("https://dev.vdocipher.com/api/videos?");
               using (var con = this.connection.connection())
               {
                   await con.ExecuteAsync("SP_SaveVideos", new { json }, commandType: System.Data.CommandType.StoredProcedure);
               }
           });
        }

        public async Task<Videos> UpdateVideos(Videos Videos, VideoRequest videoRequest)
        {
            return await Task.Run(async () =>
            {
                Videos.CourseId = videoRequest.CourseId;
                Videos.Name = videoRequest.Name;
                Videos.UpdatedAt = DateTime.Now;

                string query = "Update Videos set CourseId=@CourseId, Name=@Name, VideoUrl=@VideoUrl,UpdatedAt=@UpdatedAt" +
                               " where VideoId=@VideoId";

                using (var con = this.connection.connection())
                {
                    await con.QueryFirstOrDefaultAsync<Videos>(query, Videos);
                    return await this.GetVideo(Videos.VideoId);
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

        public async Task<IEnumerable<Videos>> GetVideosByTopic(int CourseId)
        {
            return await Task.Run(async () =>
            {
                using (var con = this.connection.connection())
                {
                    IEnumerable<Videos> videos = (await con.QueryAsync<Videos>("Select * from Videos where CourseId=@CourseId", new { CourseId })).ToList();
                  
                    return videos;
                }
            });
        }
        public async Task<Videos> GetVideoById(string VideoUrl)
        {
            return await Task.Run(async () =>
            {
                using (var con = this.connection.connection())
                {
                    Videos Videos = await con.QueryFirstOrDefaultAsync<Videos>("Select * from Videos where VideoUrl=@VideoUrl", new { VideoUrl });

                    return Videos;
                }
            });
        }
        public async Task<string> GetLink(string VideoUrl)
        {
            return await Task.Run(async () =>
            {
                string json = await this.apiCurls.GetResponce($"https://dev.vdocipher.com/api/videos/{VideoUrl}/otp");
                var obj = JsonConvert.DeserializeObject<result>(json);
                return $"https://player.vdocipher.com/v2/?otp={obj.otp}&playbackInfo={obj.playbackInfo}";
            });
        }
    }
    public class result
    {
        public string otp { get; set; }
        public string playbackInfo { get; set; }

    }
}