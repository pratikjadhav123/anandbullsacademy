using EducoreApp.DAL.DTO;

namespace EducoreApp.DAL.Interface
{
    public interface IEmailService
    {
        public Task ActiveEmail(TempUsers tempUsers);
        public Task ConfirmEmail(Users user);
        public Task ForgotEmail(Users user);
        public Task DeleteEmailConfig();
        public Task<EmailConfig> SaveEmailConfig(EmailConfig emailConfig);
        public Task<EmailConfig> GetEmailConfig();
    }
}