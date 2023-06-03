using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EducoreApp.Web.Controllers
{
    [Authorize]
    [Route("[controller]/[action]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private IPaymentDetails paymentDetails;
        private ICourse iCourse;

        public PaymentController(IPaymentDetails paymentDetails, ICourse iCourse)
        {
            this.paymentDetails = paymentDetails;
            this.iCourse = iCourse;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Course>>> GetPurchasedCourses()
        {
            IEnumerable<Course> courses = await this.paymentDetails.GetPurchasedCourses();
            return Ok(courses);
        }
        [HttpGet]
        public async Task<IActionResult> GetCourseVideos(int CourseId)
        {
            Course Course = await this.iCourse.GetCourse(CourseId);
            if (Course == null)
            {
                return NotFound(new { message = "Course not found" });
            }

            return Ok(await this.paymentDetails.GetCourseVideos(CourseId));
        }

        [HttpPost]
        public async Task<ActionResult<PaymentDetails>> PurchaseCourse([FromForm] PurchaseRequest request)
        {
            Course course = await this.iCourse.GetCourse(request.CourseId);
            if (course == null)
            {
                return NotFound("Course not found");
            }
            await this.paymentDetails.SavePaymentDetails(request);
            return Ok("Payment done succesfully");
        }
    }
}