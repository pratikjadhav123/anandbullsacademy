using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EducoreApp.Web.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("[controller]/[action]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private ICourse iCourse;

        public CourseController(ICourse iCourse)
        {
            this.iCourse = iCourse;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Course>>> GetCourse()
        {
            IEnumerable<Course> Course = await this.iCourse.GetCourse();
            return Ok(Course);
        }

        [HttpGet("{CourseId}")]
        public async Task<ActionResult<Course>> GetCourse(int CourseId)
        {
            Course Course = await this.iCourse.GetCourse(CourseId);
            if (Course == null)
            {
                return NotFound(new { message = "Course not found" });
            }
            return Ok(Course);
        }

        [HttpPost]
        public async Task<ActionResult<Course>> SaveCourse([FromForm] CourseRequest CourseRequest)
        {
            Course Course = await this.iCourse.SaveCourse(CourseRequest);
            return Ok(Course);
        }

        [HttpPut("{CourseId}")]
        public async Task<ActionResult<Course>> UpdateCourse(int CourseId, [FromForm] CourseRequest CourseRequest)
        {
            Course Course = await this.iCourse.GetCourse(CourseId);
            if (Course == null)
            {
                return NotFound(new { message = "Course not found" });
            }
            return Ok(await this.iCourse.UpdateCourse(Course, CourseRequest));
        }

        [HttpDelete("{CourseId}")]
        public async Task<ActionResult<Course>> DeleteCourse(int CourseId)
        {
            Course Course = await this.iCourse.GetCourse(CourseId);
            if (Course == null)
            {
                return NotFound(new { message = "Course not found" });
            }
            return Ok(await this.iCourse.DeleteCourse(Course));
        }
    }
}