using EducoreApp.DAL.DTO;

namespace EducoreApp.DAL.Interface
{
    public interface IEmailService
    {
        public Task ConfirmEmail(Users user);
        public Task ForgotEmail(Users user);
    }
}