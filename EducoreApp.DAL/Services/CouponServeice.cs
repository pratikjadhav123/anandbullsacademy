using Dapper;
using EducoreApp.DAL.Database;
using EducoreApp.DAL.DTO;
using EducoreApp.DAL.Interface;
using EducoreApp.DAL.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EducoreApp.DAL.Services
{
    public class CouponServeice: ICoupon
    {
        private DatabaseConnection connection;

        public CouponServeice(DatabaseConnection connection)
        {
            this.connection = connection;
        }
        public async Task<IEnumerable<Coupon>> GetCoupons()
        {
            return await Task.Run(async () =>
            {
                using (var con = this.connection.connection())
                {
                    IEnumerable<Coupon> Coupons = (await con.QueryAsync<Coupon>("Select c.CouponId, c.CourseId, c.Amount, cor.Title as Title from Coupons c left join Courses cor on c.CourseId=cor.CourseId")).ToList();
                    return Coupons;
                }
            });
        }

        public async Task<Coupon> GetCoupon(int CouponId)
        {
            return await Task.Run(async () =>
            {
                using (var con = this.connection.connection())
                {
                    Coupon Coupon = await con.QueryFirstOrDefaultAsync<Coupon>("Select c.CouponId, c.CourseId, c.Amount, cor.Title as Title from Coupons c left join Courses cor on c.CourseId=cor.CourseId where c.CouponId=@CouponId", new { CouponId });
                    return Coupon;
                }
            });
        }

        public async Task<Coupon> SaveCoupon(CouponRequest request)
        {
            return await Task.Run(async () =>
            {
                Coupon Coupon = new Coupon();
                Coupon.CourseId = request.CourseId;
                Coupon.Amount = request.Amount;

                string query = "Insert into Coupons OUTPUT inserted.* values(@CourseId,@Amount)";

                using (var con = this.connection.connection())
                {
                   return await con.QueryFirstOrDefaultAsync<Coupon>(query, Coupon);
                }
            });
        }
        public async Task<Coupon> UpdateCoupon(Coupon coupon, int amount)
        {
            return await Task.Run(async () =>
            {
                coupon.Amount =amount;

                string query = "Update Coupons set Amount=@Amount where CouponId=@CouponId";

                using (var con = this.connection.connection())
                {
                     await con.QueryFirstOrDefaultAsync<Coupon>(query, coupon);
                    return coupon;
                }
            });
        }

    }
}
