using EducoreApp.DAL.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EducoreApp.DAL.Interface
{
    public interface ICoupenVerification
    {
        public  Task<int> GetAmountByCoupon(string Coupon, int CourseId);

        public Task<CouponVerification> SaveVerification(int CouponId);
        
        public  Task DeleteVerification(string Coupon);
    }
}
