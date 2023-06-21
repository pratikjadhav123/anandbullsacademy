using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EducoreApp.DAL.DTO
{
    public class PaymentDetails
    {
        [Key]
        public int Id { get; set; }
        public string? PaymentId { get; set; }
        public int CourseId { get; set; }
        public int UserId { get; set; }
        public string? Details { get; set; }
        public DateTime PaymentDate { get; set; }
        public DateTime ExpiredDate { get; set; }
        public string? Status { get; set; }

    }
    public class PaymentHistory
    {
        public int Id { get; set; }
        public string CourseName { get; set; }=string.Empty;
        public string PaymentId { get; set; } = string.Empty;
        public string OrderId { get; set; } = string.Empty;
        public string Amount { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Contact { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public string Captured { get; set; } = string.Empty;


    }
}
