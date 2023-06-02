using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using System.ComponentModel.DataAnnotations;

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
        public async Task<ActionResult<Users>> Registration([FromForm] UserRequest userRequest)
        {
            if ((await this.iUser.GetUserByEmail(userRequest.Email)) != null)
            {
                return NotFound(new { message = "Email allready exists" });
            }
            if ((await this.iUser.GetUserByMobile(userRequest.Mobile)) != null)
            {
                return NotFound(new { message = "Mobile number allready exists" });
            }
            TempUsers users = await this.iUser.SaveTempUser(userRequest);
            return Ok(new { message = "User Created Succesfully", code = users.OTP });
        }
        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<Users>> ConfirmOTP(int OTP)
        {
            TempUsers temp = await this.iUser.ConfirmOTP(OTP);
            if (temp == null)
            {
                return NotFound();
            }
            await this.iUser.SaveUser(temp);
            await this.iUser.DeleteTempUser(temp);
            return Ok(new { message = "User Created Succesfully" });
        }

        /* [HttpPost]
         public async Task<ActionResult<Users>> ConfirmEmail(string OTP)
         {
             UserTokens userTokens = await this.iUserTokens.GetToken(OTP, "Confirm Email");
             if (userTokens == null || userTokens.ExpiredDate < DateTime.Now)
             {
                 return NotFound(new { message = "Token is invalid please check the token" });
             }
             Users users = await this.iUser.GetUserByEmail(userTokens.RequestedBy);
             if (users == null)
             {
                 return NotFound(new { message = "User does not find" });
             }
             users.EmailVerification = DateTime.Now;
             await this.iUser.UpdateUser(users);
             await this.iUserTokens.DeleteUser(userTokens);
             return Ok(users);
         }*/
        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<Users>> ResendOTP([Required, RegularExpression(@"^\+91[1-9]\d{9}$", ErrorMessage = "Mobile number should be (+91986543210) in this formate")] string Mobile)
        {
            Users users = await this.iUser.GetUserByMobile(Mobile);
            if (users == null)
            {
                return NotFound(new { message = "User does not find" });
            }
           UserTokens userTokens= await this.iUserTokens.SaveUserToken(users, "Resend OTP");
            return Ok(new { message = "OTP Send Succesfully", otp= userTokens.Token});
        }
       /* [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<Users>> ReSetOTP(int OTP)
        {
            UserTokens userTokens = await this.iUserTokens.GetOTP(OTP, "Resend OTP");
            if (userTokens == null)
            {
                return NotFound(new { message = "Invalid Otp please check OTP!!" });
            }
            if (userTokens.ExpiredDate < DateTime.Now)
            {
                await this.iUserTokens.DeleteUser(userTokens);
                return NotFound(new { message = "OTP expired please send OTP agnain!!!" });
            }
            Users users = await this.iUser.GetUserByEmail(userTokens.RequestedBy);
            if (users == null)
            {
                return NotFound(new { message = "User does not find" });
            }
            users.OTPVerification = DateTime.Now;
            Users users1 = await this.iUser.UpdateUser(users);

            return Ok(users1);
        }*/

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
            if (users.OTPVerification == null)
            {
                return NotFound(new { message = "Please confirm user mobile number" });
            }
            await this.iUserTokens.LogoutUser(users.Email);
            UserTokens userTokens = await this.iUserTokens.GenerateToken(users);

            return Ok(userTokens);
        }
/*
        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<UserTokens>> LoginWithMobile([Required, RegularExpression(@"^\+91[1-9]\d{9}$", ErrorMessage = "Mobile number should be (+91986543210) in this formate")] string Mobile)
        {
            Users users = await this.iUser.GetUserByMobile(Mobile);
            if (users == null)
            {
                return NotFound(new { message = "User does not find" });
            }
            if (users.OTPVerification == null)
            {
                return NotFound(new { message = "Please confirm user mobile number" });
            }
            await this.iUserTokens.LogoutUser(users.Email);
            UserTokens userTokens = await this.iUserTokens.GenerateToken(users);
            return Ok(userTokens);
        }
*/
        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<UserTokens>> LoginWithOTP(int OTP)
        {
            UserTokens userTokens = await this.iUserTokens.GetOTP(OTP, "Resend OTP");
            if (userTokens == null)
            {
                return NotFound(new { message = "Invalid Otp please check OTP!!" });
            }
            if (userTokens.ExpiredDate < DateTime.Now)
            {
                await this.iUserTokens.DeleteUser(userTokens);
                return NotFound(new { message = "OTP expired please send OTP agnain!!!" });
            }
            Users users = await this.iUser.GetUserByEmail(userTokens.RequestedBy);
            if (users == null)
            {
                return NotFound(new { message = "User does not find" });
            }
            await this.iUserTokens.LogoutUser(users.Email);
            UserTokens userTokens1 = await this.iUserTokens.GenerateToken(users);
            return Ok(userTokens1);
        }


        /*
                [HttpPost]
                public async Task<ActionResult<Users>> ResendEmail(string Email)
                {
                    Users users = await this.iUser.GetUserByEmail(Email);
                    if (users == null)
                    {
                        return NotFound(new { message = "User does not find" });
                    }
                    await this.iEmailService.ConfirmEmail(users);
                    return Ok(new { message = $"Resend email send successfully on Email : {Email}" });
                }
        */
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

        [Authorize]
        [HttpPut]
        public async Task<ActionResult<Users>> UpdateProfile([FromForm] UpdateProfileRequest updateProfile)
        {
            Users users = await this.iUser.GetUser(UserId);
            if (users == null)
            {
                return NotFound(new { message = "User does not find" });
            }

            Users users1 = await this.iUser.UpdateProfile(users, updateProfile);
            return Ok(users1);
        }

        [HttpPost]
        public async Task<ActionResult<Users>> ForgotPassword(string Email)
        {
            Users users = await this.iUser.GetUserByEmail(Email);
            if (users == null)
            {
                return NotFound(new { message = "User does not find" });
            }
            await this.iEmailService.ForgotEmail(users);
            return Ok(users);
        }

        [HttpPost]
        public async Task<ActionResult<Users>> ResetPassword([FromForm] ResetPasswordRequest passwordRequest)
        {
            UserTokens userTokens = await this.iUserTokens.GetToken(passwordRequest.Token, "Reset Password");
            if (userTokens == null || userTokens.ExpiredDate < DateTime.Now)
            {
                return NotFound(new { message = "Token is invalid please check the token" });
            }
            Users users = await this.iUser.GetUserByEmail(userTokens.RequestedBy);
            if (users == null)
            {
                return NotFound(new { message = "User does not find" });
            }
            users.Password = BCrypt.Net.BCrypt.HashPassword(passwordRequest.NewPassword);
            await this.iUser.UpdateUser(users);
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
            users.Password = BCrypt.Net.BCrypt.HashPassword(passwordRequest.ConfirmPassword);
            await this.iUser.UpdateUser(users);
            return Ok(users);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Users>> Logout()
        {
            var _bearer_token = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            UserTokens userTokens = await this.iUserTokens.GetToken(_bearer_token, "User Token");
            if (userTokens == null)
            {
                return NotFound();
            }
            await this.iUserTokens.DeleteUser(userTokens);
            return Ok(new { message = "Logout succesfully" });
        }
    }
}