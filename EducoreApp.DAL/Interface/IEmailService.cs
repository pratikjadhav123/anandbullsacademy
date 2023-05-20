using EducoreApp.DAL.DTO;

namespace EducoreApp.DAL.Interface
{
    public interface IEmailService
    {
        public Task SendEmail(Users user, string RequestedType);
    }
}