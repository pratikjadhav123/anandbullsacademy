namespace EducoreApp.DAL.DTO
{
    public class CouponVerification
    {
        public int Id { get; set; }
        public int CourseId { get; set; }
        public int UserId { get; set; }
        public string? Coupon { get; set; }
    }
}