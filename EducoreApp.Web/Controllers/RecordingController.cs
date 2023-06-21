using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EducoreApp.Web.Controllers
{
    [Authorize]
    [Route("[controller]/[action]")]
    [ApiController]
    public class RecordingController : ControllerBase
    {
        private IPaymentDetails paymentDetails;
        private ICourse iCourse;
        private IConfiguration configuration;
        private IUser iUser;
        private IEmailService emailService;
        private ICoupenVerification coupenVerification;
        private IVideos videos;

        public RecordingController(IPaymentDetails paymentDetails, ICourse iCourse, IConfiguration configuration, IUser iUser, IEmailService emailService, ICoupenVerification coupenVerification, IVideos videos)
        {
            this.paymentDetails = paymentDetails;
            this.iCourse = iCourse;
            this.configuration = configuration;
            this.iUser = iUser;
            this.emailService = emailService;
            this.coupenVerification = coupenVerification;
            this.videos = videos;
        }

        [HttpGet("{CourseId}")]
        public async Task<ActionResult<Course>> GetChildCourse(int CourseId)
        {
            Course Course = await this.iCourse.GetCourseByMainCourseId(CourseId);
            if (Course == null)
            {
                return NotFound(new { message = "Course not found" });
            }
            return Ok(Course);
        }

        [HttpGet]
        public async Task<ActionResult<Course>> GetPurchasedRecording()
        {
            Course courses = await this.paymentDetails.GetPurchasedRecording();
            if (courses == null)
            {
                return NotFound(new { message = "Course not foun please purchase course" });
            }
            return Ok(courses);
        }

        [HttpGet]
        public async Task<IActionResult> GetCourseRecording(int CourseId)
        {
            Course Course = await this.iCourse.GetCourse(CourseId);
            if (Course == null)
            {
                return NotFound(new { message = "Course not found" });
            }
            return Ok(await this.paymentDetails.GetCourseRecording(CourseId));
        }
        [Authorize(Roles ="Admin")]
        [HttpPost]
        public async Task<IActionResult> SaveRecording([FromForm] VideoRequest videoRequest)
        {
            Course Course = await this.iCourse.GetCourse(videoRequest.CourseId);
            if (Course == null)
            {
                return NotFound(new { message = "Course not found" });
            }
            return Ok(await this.videos.SaveRecording(videoRequest));
        }
    }
}