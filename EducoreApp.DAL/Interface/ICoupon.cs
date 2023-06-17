using EducoreApp.DAL.DTO;
using EducoreApp.DAL.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EducoreApp.DAL.Interface
{
    public interface ICoupon
    {
        public  Task<IEnumerable<Coupon>> GetCoupons();

        public  Task<Coupon> GetCoupon(int CouponId);

        public  Task<Coupon> SaveCoupon(CouponRequest request);
        public  Task<Coupon> UpdateCoupon(Coupon coupon, int amount);
    }
}
