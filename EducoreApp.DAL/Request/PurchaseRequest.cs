using System.ComponentModel.DataAnnotations;

namespace EducoreApp.DAL.Request
{
    public class PurchaseRequest
    {
        [Required]
        public int CourseId { get; set; }
        [Required]
        public string? PaymentId { get; set; }
        public string? Coupon { get; set; }

    }
    public class PurchaseRequest1
    {
        [Required]
        public int CourseId { get; set; }
        [Required]
        public string UserId { get; set; } = string.Empty;

    }
}