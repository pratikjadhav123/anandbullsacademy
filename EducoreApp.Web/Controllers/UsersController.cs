using Microsoft.AspNetCore.Mvc;

namespace EducoreApp.Web.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IUser iUser;

        public UsersController(IUser iUser)
        {
            this.iUser = iUser;
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
        public async Task<ActionResult<Users>> SaveUser([FromForm] UserRequest userRequest)
        {
            if ((await this.iUser.GetUserByEmail(userRequest.Email)) != null)
            {
                return NotFound(new { message = "Email allready exists" });
            }
            Users users = await this.iUser.SaveUser(userRequest);
            return Ok(users);
        }

        [HttpPut("{UserId}")]
        public async Task<ActionResult<Users>> UpdateUser(int UserId, [FromForm] UserRequest userRequest)
        {
            Users users = await this.iUser.GetUser(UserId);
            if (users == null)
            {
                return NotFound(new { message = "User not found" });
            }
            return Ok(await this.iUser.UpdateUser(users, userRequest));
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