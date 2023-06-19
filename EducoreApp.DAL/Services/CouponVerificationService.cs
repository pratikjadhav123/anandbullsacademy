using Dapper;
using EducoreApp.DAL.Database;
using EducoreApp.DAL.DTO;
using EducoreApp.DAL.Helper;
using EducoreApp.DAL.Interface;

namespace EducoreApp.DAL.Services
{
    public class CouponVerificationService : ICoupenVerification
    {
        private DatabaseConnection connection;

        public CouponVerificationService(DatabaseConnection connection)
        {
            this.connection = connection;
        }

        public async Task<int> GetAmountByCoupon(string Coupon, int CourseId)
        {
            return await Task.Run(async () =>
             {
                 using (var con = this.connection.connection())
                 {
                     return await con.QueryFirstOrDefaultAsync<int>("select Amount from Coupons where courseId=( select courseId from CouponVerification where Coupon=@Coupon and CourseId=@CourseId)", new { Coupon, CourseId });
                 }
             });
        }

        public async Task<CouponVerification> GetVerificationByCoupon(string Coupon)
        {
            return await Task.Run(async () =>
            {
                using (var con = this.connection.connection())
                {
                    return await con.QueryFirstOrDefaultAsync<CouponVerification>("select * from CouponVerification where Coupon=@Coupon", new { Coupon });
                }
            });
        }

        public async Task<CouponVerification> SaveVerification(Users user, int CourseId)
        {
            return await Task.Run(async () =>
             {
                 CouponVerification verification = new CouponVerification();
                 verification.CourseId = CourseId;
                 verification.UserId = user.UserId;
                 verification.Coupon = RandomStringGenerator.GenerateRandomString();
                 string query = $"Insert into CouponVerification OUTPUT inserted.* values(@CourseId,@UserId,@Coupon)";

                 using (var con = this.connection.connection())
                 {
                     return await con.QueryFirstOrDefaultAsync<CouponVerification>(query, verification);
                 }
             });
        }

        public async Task DeleteVerification(string Coupon)
        {
            await Task.Run(async () =>
           {
               using (var con = this.connection.connection())
               {
                   await con.QueryFirstOrDefaultAsync<CouponVerification>("Delete  from CouponVerification where Coupon=@Coupon", new { Coupon });
               }
           });
        }

        public async Task DeleteVerificationOfUsers(Users users)
        {
            await Task.Run(async () =>
            {
                using (var con = this.connection.connection())
                {
                    await con.QueryFirstOrDefaultAsync<Users>("Delete  from CouponVerification where UserId=@UserId",  users );
                }
            });
        }
    }
}