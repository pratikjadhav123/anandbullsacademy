using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EducoreApp.DAL.Request
{
    public class CouponRequest
    {
        [Required]
        public int CourseId { get; set; }
        [Required]
        public int Amount { get; set; }
    }
    public class SelectCourse
    {
        [Required]
        public int CourseId { get; set; }
        public string? Coupon { get; set; }

    }
}
