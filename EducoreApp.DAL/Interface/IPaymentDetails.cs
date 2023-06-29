using EducoreApp.DAL.DTO;
using EducoreApp.DAL.Request;

namespace EducoreApp.DAL.Interface
{
    public interface IPaymentDetails
    {
        public Task<PaymentDetails> GetPaymentDetailsById(int? Id);
        public Task<PaymentDetails> GetPaymentDetail(int UserId, int CourseId);
        public Task<IEnumerable<PaymentHistory>> GetPaymentHistories();
        public Task<PaymentHistory> GetPaymentHistory(string PaymentId);
        public Task<IEnumerable<Course>> GetPurchasedCourses();
        public Task<IEnumerable<Videos>> GetCourseVideos(int CourseId);
        public Task<PaymentDetails> SavePaymentDetails1(int CourseId, int UserId);
        public  Task<Course> GetPurchasedRecording();
        public Task<IEnumerable<Videos>> GetCourseRecording(int CourseId);
        public Task<PaymentDetails> SavePaymentDetails(PurchaseRequest request, string status, DateTime dateTime);
    
    }
}