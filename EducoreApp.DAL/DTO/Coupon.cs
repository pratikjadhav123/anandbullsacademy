using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EducoreApp.DAL.DTO
{
    public class Coupon
    {
        [Key]
        public int CouponId { get; set; }
        public int CourseId { get; set; }
        public int Amount { get; set; }
        [NotMapped]
        public string? Title { get; set; }

    }
}
