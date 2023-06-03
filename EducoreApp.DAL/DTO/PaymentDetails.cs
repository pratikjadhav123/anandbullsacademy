using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EducoreApp.DAL.DTO
{
    public class PaymentDetails
    {
        public int Id { get; set; }
        public string? PaymentId { get; set; }
        public int CourseId { get; set; }
        public int UserId { get; set; }
        public DateTime PaymentDate { get; set; }
    }
}
