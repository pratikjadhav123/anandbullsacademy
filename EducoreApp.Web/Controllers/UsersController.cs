using EducoreApp.DAL.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Razorpay.Api;
using System;

namespace EducoreApp.Web.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IUser iUser; 
        private IPaymentDetails paymentDetails;
        private ICourse iCourse;

        public UsersController(IUser iUser, IPaymentDetails paymentDetails,ICourse course)
        {
            this.iUser = iUser;
            this.paymentDetails = paymentDetails;
            this.iCourse = course;
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
        [Authorize(Roles ="Admin")]
        [HttpPost]
        public async Task<ActionResult<string>> PurchaseCourse([FromForm] PurchaseRequest1 request)
        {
            Course course = await this.iCourse.GetCourse(request.CourseId);
            if (course == null)
            {
                return NotFound("Course not found");
            }
            int[]? users = JsonConvert.DeserializeObject<int[]>(request.UserId);

            foreach (int UserId in users)
            {
                Users users1 = await this.iUser.GetUser(UserId);
                if (users1 == null)
                {
                    return NotFound(new { message = $"User does not find of UserId {UserId}" });
                }
                PaymentDetails users11 = await this.paymentDetails.GetPaymentDetail(users1.UserId, course.CourseId);
                if (users11 != null)
                {
                    return NotFound(new { message = $"This user '{users1.FirstName}' already purchased course '{course.Title}'" });
                }
            }

            foreach (int UserId in users)
            {
                Users users1 = await this.iUser.GetUser(UserId);
                if (users1 == null)
                {
                    return NotFound(new { message = $"User does not find of UserId {UserId}" });
                }
               await this.paymentDetails.SavePaymentDetails1(course.CourseId, users1.UserId);
            }
            return Ok(new {message= "Course apply succesfully" });
        }
    }
}