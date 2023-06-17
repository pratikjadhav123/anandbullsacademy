﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Razorpay.Api;

namespace EducoreApp.Web.Controllers
{
    [Authorize]
    [Route("[controller]/[action]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private IPaymentDetails paymentDetails;
        private ICourse iCourse;
        private IConfiguration configuration;
        private IUser iUser;
        private IEmailService emailService;
        private ICoupenVerification coupenVerification;

        public PaymentController(IPaymentDetails paymentDetails, ICourse iCourse, IConfiguration configuration, IUser iUser, IEmailService emailService, ICoupenVerification coupenVerification)
        {
            this.paymentDetails = paymentDetails;
            this.iCourse = iCourse;
            this.configuration = configuration;
            this.iUser = iUser;
            this.emailService = emailService;
            this.coupenVerification = coupenVerification;
        }

        private int UserId
        {
            get { return Convert.ToInt32(HttpContext.User.FindFirst("UserId").Value); }
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
        public async Task<ActionResult<Course>> SelectCourse([FromForm]SelectCourse selectCourse)
        {
            Course course = await this.iCourse.GetCourse(selectCourse.CourseId);
            if (course == null)
            {
                return NotFound("Course not found");
            }
            if (string.IsNullOrEmpty(selectCourse.Coupon))
            {
                return Ok(course);
            }
            int coupon = await this.coupenVerification.GetAmountByCoupon(selectCourse.Coupon, course.CourseId);
            if (coupon == null)
            {
                return NotFound(new { message = "Coupon not found" });
            }
            course.Price = course.Price - coupon;
            return Ok(course);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<Course>> ApplyDiscount(string Users)
        {
            int[]? users = JsonConvert.DeserializeObject<int[]>(Users);

            foreach (int UserId in users)
            {
                Users users1 = await this.iUser.GetUser(UserId);
                if (users1 == null)
                {
                    return NotFound(new { message = $"User does not find of UserId {UserId}" });
                }
                await this.emailService.CouponEmail(users1);
            }
            return Ok("Apply discount done");
        }

        [HttpPost]
        public async Task<ActionResult<PaymentDetails>> PurchaseCourse([FromForm] PurchaseRequest request)
        {
            Course course = await this.iCourse.GetCourse(request.CourseId);
            if (course == null)
            {
                return NotFound("Course not found");
            }
            RazorpayClient _razorpayClient = new RazorpayClient(this.configuration["RayzorPay:Key"], this.configuration["RayzorPay:Secrete"]);

            var payment = _razorpayClient.Payment.Fetch(request.PaymentId);

            string ss = JsonConvert.SerializeObject(payment.Attributes);
            PaymentStatus status = JsonConvert.DeserializeObject<PaymentStatus>(ss);

            if (status.status == "captured")
            {
                await this.coupenVerification.DeleteVerification(request.Coupon);
            }

            await this.paymentDetails.SavePaymentDetails(request, ss);
            return Ok("Payment done succesfully");
        }

        [HttpPost]
        public ActionResult<string> GetPaymentDetails(string paymentId)
        {
            RazorpayClient _razorpayClient = new RazorpayClient(this.configuration["RayzorPay:Key"], this.configuration["RayzorPay:Secrete"]);
            try
            {
                var payment = _razorpayClient.Payment.Fetch(paymentId);
                string ss = JsonConvert.SerializeObject(payment.Attributes);
                return Ok(ss);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }

    public class PaymentStatus
    {
        public string status { get; set; }
    }
}