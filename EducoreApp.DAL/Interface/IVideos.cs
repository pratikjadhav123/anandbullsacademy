using EducoreApp.DAL.DTO;
using EducoreApp.DAL.Request;

namespace EducoreApp.DAL.Interface
{
    public interface IVideos
    {
        public Task<IEnumerable<Videos>> GetVideos();

        public Task<Videos> GetVideo(int VideoId);

        public Task<Videos> SaveVideos(VideoRequest videoRequest);

        public Task<Videos> UpdateVideos(Videos Videos, VideoRequest videoRequest);

        public Task<Videos> DeleteVideos(Videos Videos);

        public Task<IEnumerable<Videos>> GetVideosByTopic(int CourseId);
    }
}