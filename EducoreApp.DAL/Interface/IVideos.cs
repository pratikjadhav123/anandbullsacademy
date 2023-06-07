using EducoreApp.DAL.DTO;
using EducoreApp.DAL.Request;

namespace EducoreApp.DAL.Interface
{
    public interface IVideos
    {
        public Task<IEnumerable<Videos>> GetVideos();

        public Task<Videos> GetVideo(int VideoId);

        public Task SaveVideos();

        public Task<Videos> UpdateVideos(Videos Videos, VideoRequest videoRequest);

        public Task<Videos> DeleteVideos(Videos Videos);

        public Task<IEnumerable<Videos>> GetVideosByTopic(int CourseId);
        public Task<Videos> GetVideoById(string VideoUrl);
        public Task<string> GetLink(string VideoUrl);
    }
}