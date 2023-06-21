/*using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EducoreApp.Web.Controllers
{
    [Authorize]
    [Route("[controller]/[action]")]
    [ApiController]
    public class PaymentHistoryController : ControllerBase
    {
        private IPaymentDetails paymentDetails;
        private ICourse iCourse;
        private IConfiguration configuration;
        private IUser iUser;

        public PaymentHistoryController(IPaymentDetails paymentDetails, ICourse iCourse, IConfiguration configuration, IUser iUser)
        {
            this.paymentDetails = paymentDetails;
            this.iCourse = iCourse;
            this.configuration = configuration;
            this.iUser = iUser;
        }

        private int UserId
        {
            get { return Convert.ToInt32(HttpContext.User.FindFirst("UserId").Value); }
        }

        [HttpGet]
        public async Task<IEnumerable<PaymentHistory>> GetPaymentHistories()
        {
            IEnumerable<PaymentHistory> paymentHistories = await this.paymentDetails.GetPaymentHistories();
            return paymentHistories;
        }

        [HttpGet]
        public async Task<ActionResult<PaymentHistory>> get(string PaymentId)
        {
            PaymentHistory history = await this.paymentDetails.GetPaymentHistory(PaymentId);
            if (history == null)
            {
                return NotFound();
            }
            return Ok(history);
        }
    }
}*/