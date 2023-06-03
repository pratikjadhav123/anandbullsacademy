using Dapper;
using EducoreApp.DAL.Database;
using EducoreApp.DAL.DTO;
using EducoreApp.DAL.Helper;
using EducoreApp.DAL.Interface;
using EducoreApp.DAL.Request;
using Microsoft.AspNetCore.Http;

namespace EducoreApp.DAL.Services
{
    public class PaymentDetailsService : IPaymentDetails
    {
        private DatabaseConnection connection;
        private IHttpContextAccessor httpContextAccessor;
        private UploadFiles uploadFiles;

        public PaymentDetailsService(DatabaseConnection connection, IHttpContextAccessor httpContextAccessor, UploadFiles uploadFiles)
        {
            this.connection = connection;
            this.httpContextAccessor = httpContextAccessor;
            this.uploadFiles = uploadFiles;
        }

        public int UserId
        {
            get { return Convert.ToInt32(this.httpContextAccessor.HttpContext.User.FindFirst("UserId").Value); }
        }

        public async Task<IEnumerable<PaymentDetails>> GetPaymentDetails()
        {
            return await Task.Run(async () =>
            {
                using (var con = this.connection.connection())
                {
                    IEnumerable<PaymentDetails> PaymentDetails = (await con.QueryAsync<PaymentDetails>("Select * from PaymentDetails")).ToList();
                    return PaymentDetails;
                }
            });
        }

        public async Task<IEnumerable<Course>> GetPurchasedCourses()
        {
            return await Task.Run(async () =>
            {
                using (var con = this.connection.connection())
                {
                    IEnumerable<Course> courses = (await con.QueryAsync<Course>("select c.CourseId, c.Title, c.Description, c.Price from PaymentDetails p left join Courses c on p.CourseId=c.CourseId where p.UserId=@UserId", new { UserId })).ToList();
                    return courses;
                }
            });
        }

        public async Task<IEnumerable<Videos>> GetCourseVideos(int CourseId)
        {
            return await Task.Run(async () =>
            {
                string query = "select v.VideoId, v.CourseId,v.Name, v.VideoUrl from PaymentDetails p left join Videos v on p.CourseId=v.CourseId where p.UserId=@UserId and p.CourseId=@CourseId";
                using (var con = this.connection.connection())
                {
                    IEnumerable<Videos> courses = (await con.QueryAsync<Videos>(query, new { UserId, CourseId })).ToList();
                    foreach (Videos videos1 in courses)
                    {
                        videos1.VideoPath = this.uploadFiles.GetVideoPath(videos1.VideoUrl, "Videos");
                    }
                    return courses;
                }
            });
        }

        public async Task<PaymentDetails> SavePaymentDetails(PurchaseRequest request)
        {
            return await Task.Run(async () =>
            {
                PaymentDetails PaymentDetails = new PaymentDetails();
                PaymentDetails.PaymentId = request.PaymentId;
                PaymentDetails.CourseId = request.CourseId;
                PaymentDetails.UserId = UserId;
                PaymentDetails.PaymentDate = DateTime.Now;

                string query = "Insert into PaymentDetails OUTPUT inserted.* values(@PaymentId,@CourseId,@UserId,@PaymentDate)";

                using (var con = this.connection.connection())
                {
                    PaymentDetails details = await con.QueryFirstOrDefaultAsync<PaymentDetails>(query, PaymentDetails);
                    return details;
                }
            });
        }
    }
}