using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EducoreApp.Web.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("[controller]/[action]")]
    [ApiController]
    public class CouponController : ControllerBase
    {
        private ICoupon iCoupon;
        private ICoupenVerification coupenVerification;

        public CouponController(ICoupon iCoupon, ICoupenVerification coupenVerification)
        {
            this.iCoupon = iCoupon;
            this.coupenVerification = coupenVerification;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Coupon>>> GetCoupons()
        {
            IEnumerable<Coupon> coupons = await this.iCoupon.GetCoupons();
            return Ok(coupons);
        }

        [HttpGet("{CouponId}")]
        public async Task<ActionResult<Coupon>> GetCoupons(int CouponId)
        {
            Coupon coupon = await this.iCoupon.GetCoupon(CouponId);
            if (coupon == null)
            {
                return NotFound(new { message = "Coupon not found" });
            }
            return Ok(coupon);
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<int>> GetAmountByCoupon(string Coupon, int CourseId)
        {
            int coupon = await this.coupenVerification.GetAmountByCoupon(Coupon, CourseId);
            if (coupon == null)
            {
                return NotFound(new { message = "Coupon not found" });
            }
            return Ok(coupon);
        }

        [HttpPut("{CouponId}")]
        public async Task<ActionResult<Coupon>> UpdateCoupon(int CouponId, int Amount)
        {
            Coupon coupon = await this.iCoupon.GetCoupon(CouponId);
            if (coupon == null)
            {
                return NotFound(new { message = "Coupon not found" });
            }
            return Ok(await this.iCoupon.UpdateCoupon(coupon, Amount));
        }
    }
}