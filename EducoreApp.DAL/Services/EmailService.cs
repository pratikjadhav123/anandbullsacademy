using EducoreApp.DAL.DTO;
using EducoreApp.DAL.Interface;
using EducoreApp.DAL.Request;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using System.Net;
using System.Net.Mail;

namespace EducoreApp.DAL.Services
{
    public class EmailService : IEmailService
    {
        private readonly SMTPConfigModel _smtpConfig;
        private IUserTokens userTokens;
        private IConfiguration configuration;

        public EmailService(IOptions<SMTPConfigModel> smtpConfig, IUserTokens userTokens, IConfiguration configuration)
        {
            _smtpConfig = smtpConfig.Value;
            this.userTokens = userTokens;
            this.configuration = configuration;
        }

        public async Task SendEmail(Users user, string RequestedType)
        {
            await Task.Run(async () =>
            {
                UserTokens userTokens = await this.userTokens.SaveUserToken(user, RequestedType);
                string token = userTokens.Token;
                string subject = (RequestedType == "Confirm Email") ? "Confirm Your Account" : "Reset Your Password";
                string body = (RequestedType == "Confirm Email") ? "EmailConfirm.html" : "ForgotPassword.html";
                string link = this.configuration["FrontEndUrl"] + ((RequestedType == "Confirm Email") ? $"/confirm-email/{token}" : $"/resetpassword/{token}");
                UserEmailOptions userEmailOptions = new UserEmailOptions()
                {
                    Subject = subject,
                    ToEmails = user.Email,
                    PlaceHolders = new List<KeyValuePair<string, string>>()
                    {
                        new KeyValuePair<string, string>("{{UserName}}",user.FirstName),
                        new KeyValuePair<string, string>("{{Link}}",link)
                    }
                };
                userEmailOptions.Body = GetEmailBody(body, userEmailOptions.PlaceHolders);
                await this.ConnectEmail(userEmailOptions);
                /* if (userEmailOptions != null)
                 {
                     BackgroundJob.Enqueue(()=>this.ConnectEmail(userEmailOptions));
                 }*/
            });
        }

        public async Task ConnectEmail(UserEmailOptions userEmailOptions)
        {
            MailMessage mail = new MailMessage
            {
                Subject = userEmailOptions.Subject,
                Body = userEmailOptions.Body,
                From = new MailAddress(_smtpConfig.SenderAddress, _smtpConfig.SenderDisplayName),
                IsBodyHtml = _smtpConfig.IsBodyHTML
            };
            mail.To.Add(userEmailOptions.ToEmails);
            using (SmtpClient smtp = new SmtpClient(_smtpConfig.Host, _smtpConfig.Port))
            {
                smtp.EnableSsl = _smtpConfig.EnableSSL;
                smtp.Credentials = new NetworkCredential(_smtpConfig.UserName, _smtpConfig.Password);
                await smtp.SendMailAsync(mail);
            }
        }

        public string GetEmailBody(string templateName, List<KeyValuePair<string, string>> keyValuePairs)
        {
            string path = Directory.GetCurrentDirectory() + @"/wwwroot/EmailTemplates/" + templateName;
            var body = File.ReadAllText(path);
            if (!string.IsNullOrEmpty(body) && keyValuePairs != null)
            {
                foreach (var placeholder in keyValuePairs)
                {
                    if (body.Contains(placeholder.Key))
                    {
                        body = body.Replace(placeholder.Key, placeholder.Value);
                    }
                }
            }

            return body;
        }
    }
}