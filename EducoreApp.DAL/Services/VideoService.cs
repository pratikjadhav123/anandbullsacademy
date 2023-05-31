using Dapper;
using EducoreApp.DAL.Database;
using EducoreApp.DAL.DTO;
using EducoreApp.DAL.Helper;
using EducoreApp.DAL.Interface;
using EducoreApp.DAL.Request;

namespace EducoreApp.DAL.Services
{
    public class VideoService : IVideos
    {
        private DatabaseConnection connection;
        private UploadFiles uploadFiles;

        public VideoService(DatabaseConnection connection, UploadFiles uploadFiles)
        {
            this.connection = connection;
            this.uploadFiles = uploadFiles;
        }

        public async Task<IEnumerable<Videos>> GetVideos()
        {
            return await Task.Run(async () =>
            {
                using (var con = this.connection.connection())
                {
                    IEnumerable<Videos> videos = (await con.QueryAsync<Videos>("Select * from Videos")).ToList();
                    foreach(Videos videos1 in videos)
                    {
                        videos1.VideoPath =  this.uploadFiles.GetVideoPath(videos1.VideoUrl);
                    }
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
                   Videos.VideoPath = this.uploadFiles.GetVideoPath(Videos.VideoUrl);
                    return Videos;
                }
            });
        }

        public async Task<Videos> SaveVideos(VideoRequest videoRequest)
        {
            return await Task.Run(async () =>
            {
                Videos Videos = new Videos();
                Videos.CourseId = videoRequest.CourseId;
                Videos.Name = videoRequest.Name;
                if (videoRequest.Video != null && videoRequest.Video.Length > 0)
                {
                    Videos.VideoUrl = await this.uploadFiles.SaveVideo(videoRequest.Video);
                }

                string query = "Insert into Videos OUTPUT inserted.* values(@CourseId,@Name,@VideoUrl,@CreatedAt,@UpdatedAt)";

                using (var con = this.connection.connection())
                {
                    Videos videos = await con.QueryFirstOrDefaultAsync<Videos>(query, Videos);
                    return await this.GetVideo(videos.VideoId);
                }
            });
        }

        public async Task<Videos> UpdateVideos(Videos Videos, VideoRequest videoRequest)
        {
            return await Task.Run(async () =>
            {
                Videos.CourseId = videoRequest.CourseId;
                Videos.Name = videoRequest.Name;
                if (videoRequest.Video != null && videoRequest.Video.Length > 0)
                {
                    Videos.VideoUrl = await this.uploadFiles.SaveVideo(videoRequest.Video);
                }
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
                    this.uploadFiles.DeleteFile(Videos.VideoUrl);
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
                    foreach (Videos videos1 in videos)
                    {
                        videos1.VideoPath = this.uploadFiles.GetVideoPath(videos1.VideoUrl);
                    }
                    return videos;
                }
            });
        }
    }
}