using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;

namespace EducoreApp.Web.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private IUser iUser;
        private IUserTokens iUserTokens;
        private IEmailService iEmailService;

        public AuthController(IUser iUser, IUserTokens iUserTokens, IEmailService iEmailService)
        {
            this.iUser = iUser;
            this.iUserTokens = iUserTokens;
            this.iEmailService = iEmailService;
        }

        private int UserId
        {
            get { return Convert.ToInt32(HttpContext.User.FindFirst("UserId").Value); }
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<UserTokens>> Login([FromForm] LoginRequest loginRequest)
        {
            Users users = await this.iUser.GetUserByEmail(loginRequest.Email);
            if (users == null)
            {
                return NotFound(new { message = "User does not find" });
            }
            if (!(BCrypt.Net.BCrypt.Verify(loginRequest.Password, users.Password)))
            {
                return NotFound(new { message = "PLease enter correct password" });
            }
            UserTokens userTokens = await this.iUserTokens.GenerateToken(users);
            return Ok(userTokens);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Users>> UserDetails()
        {
            Users users = await this.iUser.GetUser(UserId);
            if (users == null)
            {
                return NotFound(new { message = "User does not find" });
            }
            return Ok(users);
        }

        [HttpPost]
        public async Task<ActionResult<Users>> ForgotPassword(string Email)
        {
            Users users = await this.iUser.GetUserByEmail(Email);
            if (users == null)
            {
                return NotFound(new { message = "User does not find" });
            }
            await this.iEmailService.SendEmail(users, "Reset Password");
            return Ok(users);
        }

        [HttpPost]
        public async Task<ActionResult<Users>> ResetPassword([FromForm] ResetPasswordRequest passwordRequest)
        {
            UserTokens userTokens = await this.iUserTokens.GetToken(passwordRequest.Token);
            if (userTokens == null || userTokens.ExpiredDate < DateTime.Now)
            {
                return NotFound(new { message = "Token is invalid please check the token" });
            }
            Users users = await this.iUser.GetUserByEmail(userTokens.RequestedBy);
            if (users == null)
            {
                return NotFound(new { message = "User does not find" });
            }
            await this.iUser.UpdatePassword(users, passwordRequest.ConfirmPassword);
            await this.iUserTokens.DeleteUser(userTokens);
            return Ok(users);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Users>> ChangePassword([FromForm] ChangePasswordRequest passwordRequest)
        {
            Users users = await this.iUser.GetUser(this.UserId);
            if (users == null)
            {
                return NotFound(new { message = "User does not find" });
            }
            if (!BCrypt.Net.BCrypt.Verify(passwordRequest.OldPassword, users.Password))
            {
                return NotFound(new { message = "Password not correct" });
            }
            await this.iUser.UpdatePassword(users, passwordRequest.ConfirmPassword);
            return Ok(users);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Users>> Logout()
        {
            var _bearer_token = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            UserTokens userTokens = await this.iUserTokens.GetToken(_bearer_token);
            if (userTokens == null)
            {
                return NotFound();
            }
            await this.iUserTokens.DeleteUser(userTokens);
            return Ok(new { message = "Logout succesfully" });
        }
    }
}