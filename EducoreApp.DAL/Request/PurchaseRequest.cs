using System.ComponentModel.DataAnnotations;

namespace EducoreApp.DAL.Request
{
    public class PurchaseRequest
    {
        [Required]
        public int CourseId { get; set; }
        [Required]
        public string? PaymentId { get; set; }


        public int UserId { get; set; }
    }
}