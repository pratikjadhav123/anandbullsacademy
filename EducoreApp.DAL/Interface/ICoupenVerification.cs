using EducoreApp.DAL.DTO;

namespace EducoreApp.DAL.Interface
{
    public interface ICoupenVerification
    {
        public Task<int> GetAmountByCoupon(string Coupon, int CourseId);

        public Task<CouponVerification> GetVerificationByCoupon(string Coupon);

        public Task<CouponVerification> SaveVerification(Users users, int CouponId);

        public Task DeleteVerification(string Coupon);

        public Task DeleteVerificationOfUsers(Users users);
    }
}