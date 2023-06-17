using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EducoreApp.DAL.DTO
{
    public class CouponVerification
    {
        public int Id { get; set; }
        public  int CourseId { get; set; }
        public string? Coupon { get; set; } 
    }
}
