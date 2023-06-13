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
        private ApiCurls ApiCurls;
        private IUser iUser;

        public VideosController(ICourse iCourse, IVideos iVideos, ApiCurls apiCurls, IUser iUser)
        {
            this.iCourse = iCourse;
            this.iVideos = iVideos;
            this.ApiCurls = apiCurls;
            this.iUser = iUser;
        }

        private int UserId
        {
            get { return Convert.ToInt32(HttpContext.User.FindFirst("UserId").Value); }
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
        [HttpGet("{VideoUrl}")]
        public async Task<ActionResult<Videos>> GetLink(string VideoUrl)
        {
            Videos Videos = await this.iVideos.GetVideoById(VideoUrl);
            if (Videos == null)
            {
                return NotFound(new { message = "Videos not found" });
            }
            Users users = await this.iUser.GetUser(UserId);
            if (users == null)
            {
                return NotFound(new { message = "User does not find" });
            }
            Videos.VideoUrl = await this.iVideos.GetLink(VideoUrl, users);
            return Ok(Videos);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<Videos>> SaveVideos()
        {
            await this.iVideos.SaveVideos();
            return Ok("Video saved succesfully");
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