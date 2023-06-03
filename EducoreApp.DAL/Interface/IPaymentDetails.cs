using EducoreApp.DAL.DTO;
using EducoreApp.DAL.Request;

namespace EducoreApp.DAL.Interface
{
    public interface IPaymentDetails
    {
        public Task<IEnumerable<PaymentDetails>> GetPaymentDetails();
        public Task<IEnumerable<Course>> GetPurchasedCourses();
        public Task<IEnumerable<Videos>> GetCourseVideos(int CourseId);
        public Task<PaymentDetails> SavePaymentDetails(PurchaseRequest request);
    }
}