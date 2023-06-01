using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EducoreApp.Web.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class VideosController : ControllerBase
    {
        private ICourse iCourse;
        private IVideos iVideos;

        public VideosController(ICourse iCourse, IVideos iVideos)
        {
            this.iCourse = iCourse;
            this.iVideos = iVideos;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Videos>>> GetVideos()
        {
            IEnumerable<Videos> Videos = await this.iVideos.GetVideos();
            return Ok(Videos);
        }

        [Authorize]
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

        [Authorize]
        [HttpGet("{CourseId}")]
        public async Task<ActionResult<IEnumerable<Videos>>> GetVideosByCourse(int CourseId)
        {
            Course Course = await this.iCourse.GetCourse(CourseId);
            if (Course == null)
            {
                return NotFound(new { message = "Course not found" });
            }
            IEnumerable<Videos> videos = await this.iVideos.GetVideosByTopic(CourseId);
            return Ok(videos);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<Videos>> SaveVideos([FromForm] VideoRequest videoRequest)
        {
            Course Course = await this.iCourse.GetCourse(videoRequest.CourseId);
            if (Course == null)
            {
                return NotFound(new { message = "Course not found" });
            }
            Videos Videos = await this.iVideos.SaveVideos(videoRequest);
            return Ok(Videos);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{VideoId}")]
        public async Task<ActionResult<Course>> UpdateVideos(int VideoId, [FromForm] VideoRequest videoRequest)
        {
            Videos Videos = await this.iVideos.GetVideo(VideoId);
            if (Videos == null)
            {
                return NotFound(new { message = "Videos not found" });
            }
            Course Course = await this.iCourse.GetCourse(videoRequest.CourseId);
            if (Course == null)
            {
                return NotFound(new { message = "Course not found" });
            }
            return Ok(await this.iVideos.UpdateVideos(Videos, videoRequest));
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{VideoId}")]
        public async Task<ActionResult<Course>> DeleteVideos(int VideoId)
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