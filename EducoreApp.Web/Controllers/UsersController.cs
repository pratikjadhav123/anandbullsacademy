using Microsoft.AspNetCore.Authorization;
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