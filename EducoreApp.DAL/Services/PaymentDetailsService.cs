using Dapper;
using EducoreApp.DAL.Database;
using EducoreApp.DAL.DTO;
using EducoreApp.DAL.Helper;
using EducoreApp.DAL.Interface;
using EducoreApp.DAL.Request;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace EducoreApp.DAL.Services
{
    public class PaymentDetailsService : IPaymentDetails
    {
        private DatabaseConnection connection;
        private IHttpContextAccessor httpContextAccessor;
        private UploadFiles uploadFiles;
        private IConfiguration configuration;

        public PaymentDetailsService(DatabaseConnection connection, IHttpContextAccessor httpContextAccessor, UploadFiles uploadFiles, IConfiguration configuration)
        {
            this.connection = connection;
            this.httpContextAccessor = httpContextAccessor;
            this.uploadFiles = uploadFiles;
            this.configuration = configuration;
        }

        public int UserId
        {
            get { return Convert.ToInt32(this.httpContextAccessor.HttpContext.User.FindFirst("UserId").Value); }
        }

        public async Task<PaymentDetails> GetPaymentDetailsById(int? Id)
        {
            return await Task.Run(async () =>
            {
                using (var con = this.connection.connection())
                {
                    string query = "Select * from PaymentDetails where Id=@Id";
                    PaymentDetails paymentHistories = await con.QueryFirstOrDefaultAsync<PaymentDetails>(query, new { Id });
                    return paymentHistories;
                }
            });
        }

        public async Task<PaymentDetails> GetPaymentDetail(int UserId, int CourseId)
        {
            return await Task.Run(async () =>
            {
                using (var con = this.connection.connection())
                {
                    string query = "Select * from PaymentDetails where UserId=@UserId and CourseId=@CourseId and Status='Active'";
                    PaymentDetails paymentHistories = await con.QueryFirstOrDefaultAsync<PaymentDetails>(query, new { UserId, CourseId });
                    return paymentHistories;
                }
            });
        }

        public async Task<IEnumerable<PaymentHistory>> GetPaymentHistories()
        {
            return await Task.Run(async () =>
            {
                using (var con = this.connection.connection())
                {
                    string query = "SELECT Id, c.Title as CourseName, PaymentId,JSON_VALUE(Details,'$.order_id') as OrderId,JSON_VALUE(Details,'$.amount') as Amount,JSON_VALUE(Details,'$.email') as Email,JSON_VALUE(Details,'$.contact') as Contact," +
                    "JSON_VALUE(Details,'$.status') as Status,JSON_VALUE(Details,'$.captured') as Captured FROM PaymentDetails p left join Courses c on p.CourseId=c.CourseId";
                    IEnumerable<PaymentHistory> paymentHistories = (await con.QueryAsync<PaymentHistory>(query)).ToList();
                    return paymentHistories;
                }
            });
        }

        public async Task<PaymentHistory> GetPaymentHistory(string PaymentId)
        {
            return await Task.Run(async () =>
            {
                using (var con = this.connection.connection())
                {
                    string query = "SELECT Id, c.Title as CourseName, PaymentId,JSON_VALUE(Details,'$.order_id') as OrderId,JSON_VALUE(Details,'$.amount') as Amount,JSON_VALUE(Details,'$.email') as Email,JSON_VALUE(Details,'$.contact') as Contact," +
                    "JSON_VALUE(Details,'$.status') as Status,JSON_VALUE(Details,'$.captured') as Captured FROM PaymentDetails p left join Courses c on p.CourseId=c.CourseId where p.PaymentId=@PaymentId";
                    PaymentHistory paymentHistories = await con.QueryFirstOrDefaultAsync<PaymentHistory>(query, new { PaymentId });
                    return paymentHistories;
                }
            });
        }

        public async Task<IEnumerable<Course>> GetPurchasedCourses()
        {
            return await Task.Run(async () =>
            {
                /*string query = $"Update PaymentDetails set Status='Expired' where ExpiredDate<=getutcdate()";

                using (var con = this.connection.connection())
                {
                    await con.ExecuteAsync(query);
                    IEnumerable<Course> courses = (await con.QueryAsync<Course>("select c.CourseId, c.Title, c.Description, c.Price  from PaymentDetails p left join Courses c on p.CourseId=c.CourseId where p.UserId=@UserId and JSON_VALUE(p.Details,'$.status')='authorized' and p.Status='Active'", new { UserId })).ToList();
                    return courses;
                }*/
                string query = $"Update PaymentDetails set Status='Expired' where ExpiredDate<=getutcdate()";

                using (var con = this.connection.connection())
                {
                    await con.ExecuteAsync(query);
                    IEnumerable<Course> courses = (await con.QueryAsync<Course>("select c.CourseId, c.Title, c.Description, c.Price  from PaymentDetails p left join Courses c on p.CourseId=c.CourseId where p.UserId=@UserId and p.Status='Active'", new { UserId })).ToList();
                    return courses;
                }
            });
        }

        public async Task<IEnumerable<Videos>> GetCourseVideos(int CourseId)
        {
            return await Task.Run(async () =>
            {
                string query = "select v.VideoId, v.CourseId,v.Name, v.VideoUrl from PaymentDetails p left join Videos v on p.CourseId=v.CourseId where p.UserId=@UserId and p.CourseId=@CourseId and p.Status='Active'";
                using (var con = this.connection.connection())
                {
                    IEnumerable<Videos> courses = (await con.QueryAsync<Videos>(query, new { UserId, CourseId })).ToList();

                    return courses;
                }
            });
        }

        public async Task<Course> GetPurchasedRecording()
        {
            return await Task.Run(async () =>
            {
                string query = $"Update PaymentDetails set Status='Expired' where ExpiredDate<=getutcdate()";
                using (var con = this.connection.connection())
                {
                    await con.ExecuteAsync(query);
                    Course courses = await con.QueryFirstOrDefaultAsync<Course>("select c.CourseId, c.Title, c.Description, c.Price  from PaymentDetails p left join Courses c on p.CourseId=c.CourseId where p.UserId=@UserId and JSON_VALUE(p.Details,'$.status')='authorized' and p.Status='Active' and c.MainCourseId!=0", new { UserId });
                    return courses;
                }
            });
        }

        public async Task<IEnumerable<Videos>> GetCourseRecording(int CourseId)
        {
            return await Task.Run(async () =>
            {
                string query = "select v.VideoId, v.CourseId,v.Name, v.VideoUrl from PaymentDetails p left join Videos v on p.CourseId=v.CourseId where p.UserId=@UserId and p.CourseId=@CourseId  and JSON_VALUE(p.Details,'$.status')='authorized' and p.Status='Active' and CONVERT(DATE, v.CreatedAt) >= CONVERT(DATE, p.PaymentDate)";
                using (var con = this.connection.connection())
                {
                    IEnumerable<Videos> courses = (await con.QueryAsync<Videos>(query, new { UserId, CourseId })).ToList();
                    foreach(Videos videos in courses)
                    {
                        videos.VideoPath = this.uploadFiles.GetVideoPath(videos.VideoUrl, "Recordings");
                    }
                    return courses;
                }
            });
        }

        public async Task<PaymentDetails> SavePaymentDetails(PurchaseRequest request, string Details, DateTime dateTime)
        {
            return await Task.Run(async () =>
            {
                PaymentDetails PaymentDetails = new PaymentDetails();
                PaymentDetails.PaymentId = request.PaymentId;
                PaymentDetails.CourseId = request.CourseId;
                PaymentDetails.UserId = UserId;
                PaymentDetails.Details = Details;
                PaymentDetails.PaymentDate = DateTime.UtcNow;
                PaymentDetails.ExpiredDate = dateTime;
                PaymentDetails.Status = "Active";

                string query = "Insert into PaymentDetails OUTPUT inserted.* values(@PaymentId,@CourseId,@UserId,@Details,@PaymentDate,@ExpiredDate,@Status)";

                using (var con = this.connection.connection())
                {
                    PaymentDetails details = await con.QueryFirstOrDefaultAsync<PaymentDetails>(query, PaymentDetails);
                    return details;
                }
            });
        }
        public async Task<PaymentDetails> SavePaymentDetails1(int CourseId, int UserId)
        {
            return await Task.Run(async () =>
            {
                PaymentDetails PaymentDetails = new PaymentDetails();
                PaymentDetails.PaymentId = new Random().Next(10000,99999).ToString();
                PaymentDetails.CourseId = CourseId;
                PaymentDetails.UserId = UserId;
                PaymentDetails.Details = "";
                PaymentDetails.PaymentDate = DateTime.UtcNow;
                PaymentDetails.ExpiredDate = DateTime.UtcNow.AddMonths(6);
                PaymentDetails.Status = "Active";

                string query = "Insert into PaymentDetails OUTPUT inserted.* values(@PaymentId,@CourseId,@UserId,@Details,@PaymentDate,@ExpiredDate,@Status)";

                using (var con = this.connection.connection())
                {
                    PaymentDetails details = await con.QueryFirstOrDefaultAsync<PaymentDetails>(query, PaymentDetails);
                    return details;
                }
            });
        }
    }
}