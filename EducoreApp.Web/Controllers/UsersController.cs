using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EducoreApp.Web.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IUser iUser;
        private ICourse iCourse;
        private IHttpContextAccessor httpContextAccessor;

        public UsersController(IUser iUser, ICourse iCourse, IHttpContextAccessor httpContextAccessor)
        {
            this.iUser = iUser;
            this.iCourse = iCourse;
            this.httpContextAccessor = httpContextAccessor;
        }

        public int CourseId
        {
            get { return Convert.ToInt32(HttpContext.User.FindFirst("CourseId").Value); }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Users>>> GetUsers()
        {
            IEnumerable<Users> users = await this.iUser.GetUsers();
            return Ok(users);
        }

        [HttpGet("{UserId}")]
        public async Task<ActionResult<Users>> GetUser(int UserId)
        {
            Users users = await this.iUser.GetUser(UserId);
            if (users == null)
            {
                return NotFound(new { message = "User not found" });
            }
            return Ok(users);
        }

        [HttpPost]
        public async Task<ActionResult<Users>> PurchaseCourse([FromForm] PurchaseRequest request)
        {
            if (string.IsNullOrEmpty(request.UserId.ToString()))
            {
                return NotFound(new { message = "Please sign up for purchase this course!!!!" });
            }
            Users users = await this.iUser.GetUser(request.UserId);
            if (users == null)
            {
                return NotFound(new { message = "Please sign up for purchase this course!!" });
            }
            Course Course = await this.iCourse.GetCourse(request.CourseId);
            if (Course == null)
            {
                return NotFound(new { message = "Course not found" });
            }
            users.CourseId = Course.CourseId;
            Users users1 = await this.iUser.UpdateUser(users);
            return Ok(users1);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<Course>> GetCourse()
        {
            Course Course = await this.iCourse.GetCourse(this.CourseId);
            if (Course == null)
            {
                return NotFound(new { message = "Course not found" });
            }
            return Ok(Course);
        }

        [HttpPut("{UserId}")]
        public async Task<ActionResult<Users>> UpdateUser(int UserId, [FromForm] UserRequest userRequest)
        {
            Users users = await this.iUser.GetUser(UserId);
            if (users == null)
            {
                return NotFound(new { message = "User not found" });
            }
            users.FirstName = userRequest.FirstName;
            users.LastName = userRequest.LastName;
            users.Email = userRequest.Email;
            users.Password = BCrypt.Net.BCrypt.HashPassword(userRequest.Password);
            users.Mobile = userRequest.Mobile;

            return Ok(await this.iUser.UpdateUser(users));
        }

        [HttpDelete("{UserId}")]
        public async Task<ActionResult<Users>> DeleteUser(int UserId)
        {
            Users users = await this.iUser.GetUser(UserId);
            if (users == null)
            {
                return NotFound(new { message = "User not found" });
            }
            return Ok(await this.iUser.DeleteUser(users));
        }
    }
}