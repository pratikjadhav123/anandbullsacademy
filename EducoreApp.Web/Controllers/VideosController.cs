using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EducoreApp.Web.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("[controller]/[action]")]
    [ApiController]
    public class VideosController : ControllerBase
    {
        private ITopic iTopic;
        private IVideos iVideos;

        public VideosController(ITopic iTopic, IVideos iVideos)
        {
            this.iTopic = iTopic;
            this.iVideos = iVideos;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Videos>>> GetVideos()
        {
            IEnumerable<Videos> Videos = await this.iVideos.GetVideos();
            return Ok(Videos);
        }

        [HttpGet("{VideoId}")]
        public async Task<ActionResult<Videos>> GetVideo(int VideoId)
        {
            Videos Videos = await this.iVideos.GetVideo(VideoId);
            if (Videos == null)
            {
                return NotFound(new { message = "Videos not found" });
            }
            return Ok(Videos);
        }

        [HttpGet("{TopicId}")]
        public async Task<ActionResult<IEnumerable<Videos>>> GetVideosByTopic(int TopicId)
        {
            Topic Topic = await this.iTopic.GetTopic(TopicId);
            if (Topic == null)
            {
                return NotFound(new { message = "Topic not found" });
            }
            IEnumerable<Videos> videos = await this.iVideos.GetVideosByTopic(TopicId);
            return Ok(videos);
        }

        [HttpPost]
        public async Task<ActionResult<Videos>> SaveVideos([FromForm] VideoRequest videoRequest)
        {
            Topic Topic = await this.iTopic.GetTopic(videoRequest.TopicId);
            if (Topic == null)
            {
                return NotFound(new { message = "Topic not found" });
            }
            Videos Videos = await this.iVideos.SaveVideos(videoRequest);
            return Ok(Videos);
        }

        [HttpPut("{VideoId}")]
        public async Task<ActionResult<Topic>> UpdateVideos(int VideoId, [FromForm] VideoRequest videoRequest)
        {
            Videos Videos = await this.iVideos.GetVideo(VideoId);
            if (Videos == null)
            {
                return NotFound(new { message = "Videos not found" });
            }
            Topic Topic = await this.iTopic.GetTopic(videoRequest.TopicId);
            if (Topic == null)
            {
                return NotFound(new { message = "Topic not found" });
            }
            return Ok(await this.iVideos.UpdateVideos(Videos, videoRequest));
        }

        [HttpDelete("{VideoId}")]
        public async Task<ActionResult<Topic>> DeleteVideos(int VideoId)
        {
            Videos Videos = await this.iVideos.GetVideo(VideoId);
            if (Videos == null)
            {
                return NotFound(new { message = "Videos not found" });
            }
            return Ok(await this.iVideos.DeleteVideos(Videos));
        }
    }
}