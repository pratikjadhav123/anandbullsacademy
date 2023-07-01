using Dapper;
using EASendMail;
using EducoreApp.DAL.Database;
using EducoreApp.DAL.DTO;
using EducoreApp.DAL.Helper;
using EducoreApp.DAL.Interface;
using EducoreApp.DAL.Request;
using Hangfire;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace EducoreApp.DAL.Services
{
    public class EmailService : IEmailService
    {
        private readonly EmailCredentials _credentials;
        private IUserTokens userTokens;
        private IConfiguration configuration;
        private DatabaseConnection connection;
        private ApiCurls apiCurls;
        private ICoupenVerification verification;

        public EmailService(IOptions<EmailCredentials> credentials, IUserTokens userTokens, IConfiguration configuration, DatabaseConnection connection, ApiCurls apiCurls, ICoupenVerification verification)
        {
            _credentials = credentials.Value;
            this.userTokens = userTokens;
            this.configuration = configuration;
            this.connection = connection;
            this.apiCurls = apiCurls;
            this.verification = verification;
        }

        public async Task ActiveEmail(TempUsers tempUsers)
        {
            await Task.Run(async () =>
            {
                UserTokens userTokens = await this.userTokens.SaveUserToken(tempUsers.Email, Convert.ToString(tempUsers.OTP), "Confirm Email");

                UserEmailOptions userEmailOptions = new UserEmailOptions()
                {
                    Subject = "Active Your Account",
                    ToEmails = tempUsers.Email,
                    PlaceHolders = new List<KeyValuePair<string, string>>()
                    {
                        new KeyValuePair<string, string>("{{FirstName}}",tempUsers.FirstName),
                        new KeyValuePair<string, string>("{{Email}}",tempUsers.Email),
                        new KeyValuePair<string, string>("{{OTP}}",userTokens.Token)
                    }
                };
                userEmailOptions.Body = GetEmailBody("EmailConfirm.html", userEmailOptions.PlaceHolders);
                if (this.configuration["LiveEmail"] == "false")
                {
                   await this.ConnectEmail(userEmailOptions);
                    
                }
                else
                {
                    await this.SendEmail(userEmailOptions);
                    
                }
            });
        }

        public async Task CouponEmail(Users user)
        {
            await Task.Run(async () =>
            {
                CouponVerification verification1 = await this.verification.SaveVerification(user,1);
                CouponVerification verification2 = await this.verification.SaveVerification(user,2);

                UserEmailOptions userEmailOptions = new UserEmailOptions()
                {
                    Subject = "Coupon Email",
                    ToEmails = user.Email,
                    PlaceHolders = new List<KeyValuePair<string, string>>()
                    {
                        new KeyValuePair<string, string>("{{FullName}}",user.FirstName),
                        new KeyValuePair<string, string>("{{c1}}",verification1.Coupon),
                        new KeyValuePair<string, string>("{{c2}}",verification2.Coupon)
                    }
                };
                userEmailOptions.Body = GetEmailBody("Coupon.html", userEmailOptions.PlaceHolders);
                if (this.configuration["LiveEmail"] == "false")
                {
                    await this.ConnectEmail(userEmailOptions);
                    
                }
                else
                {
                    await this.SendEmail(userEmailOptions);
                    
                }
            });
        }

        public async Task ForgotEmail(Users user)
        {
            await Task.Run(async () =>
            {
                string otp = new Random().Next(10000, 99999).ToString();
                UserTokens userTokens = await this.userTokens.SaveUserToken(user.Email, otp, "Reset Password");
                string token = userTokens.Token;
                string link = this.configuration["FrontEndUrl"] + $"/resetpassword/{token}";
                UserEmailOptions userEmailOptions = new UserEmailOptions()
                {
                    Subject = "Reset Your Password",
                    ToEmails = user.Email,
                    PlaceHolders = new List<KeyValuePair<string, string>>()
                    {
                        new KeyValuePair<string, string>("{{UserName}}",user.FirstName),
                        new KeyValuePair<string, string>("{{Link}}",link)
                    }
                };
                userEmailOptions.Body = GetEmailBody("ResetPassword.html", userEmailOptions.PlaceHolders);
                if (this.configuration["LiveEmail"] == "false")
                {
                    await this.ConnectEmail(userEmailOptions);
                    
                }
                else
                {
                   await this.SendEmail(userEmailOptions);
                    
                }
            });
        }

        public async Task<SmtpClient> SendEmail(UserEmailOptions userEmailOptions)
        {
            EmailConfig? emailConfig = await this.GetEmailConfig();
            SmtpServer oServer = new SmtpServer("smtp.gmail.com");
            oServer.ConnectType = SmtpConnectType.ConnectSSLAuto;
            oServer.Port = 587;
            oServer.AuthType = SmtpAuthType.XOAUTH2;
            oServer.User = emailConfig.Email;
            oServer.Password = emailConfig.AccessToken;

            SmtpMail oMail = new SmtpMail("TryIt");
            oMail.From = emailConfig.Email;
            oMail.To = userEmailOptions.ToEmails;
            oMail.Subject = userEmailOptions.Subject;
            oMail.HtmlBody = userEmailOptions.Body;

            SmtpClient oSmtp = new SmtpClient();
            oSmtp.SendMail(oServer, oMail);
            return oSmtp;
        }

        public async Task ConnectEmail(UserEmailOptions userEmailOptions)
        {
            System.Net.Mail.MailMessage mail = new System.Net.Mail.MailMessage
            {
                Subject = userEmailOptions.Subject,
                Body = userEmailOptions.Body,
                From = new System.Net.Mail.MailAddress(this.configuration["SMTPConfig:SenderAddress"]),
                IsBodyHtml = true
            };
            mail.To.Add(userEmailOptions.ToEmails);
            using (System.Net.Mail.SmtpClient smtp = new System.Net.Mail.SmtpClient(this.configuration["SMTPConfig:Host"], 587))
            {
                smtp.EnableSsl = true;
                smtp.Credentials = new System.Net.NetworkCredential(this.configuration["SMTPConfig:UserName"], this.configuration["SMTPConfig:Password"]);
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

        public async Task<EmailConfig> GetEmailConfig()
        {
            return await Task.Run(async () =>
            {
                string query = $"Select * from EmailConfig where Id=1";

                using (var con = this.connection.connection())
                {
                    EmailConfig emailConfig = await con.QueryFirstOrDefaultAsync<EmailConfig>(query);
                    if (emailConfig.ExpiredTime < DateTime.UtcNow)
                    {
                        var request = $"{_credentials.tokenUri}?refresh_token={emailConfig.RefreshToken}&redirect_uri={_credentials.redirectUri}&client_id={_credentials.clientID}&client_secret={_credentials.clientSecret}&grant_type=refresh_token";
                        string token = await this.apiCurls.GetTokens(request);
                        Responces? responces = JsonConvert.DeserializeObject<Responces>(token);

                        emailConfig.AccessToken = responces.access_token;
                        emailConfig.ExpiredTime = DateTime.UtcNow.AddMinutes(30);
                        await this.UpdateEmailConfig(emailConfig);
                    }
                    return emailConfig;
                }
            });
        }

        public async Task<EmailConfig> SaveEmailConfig(EmailConfig emailConfig)
        {
            return await Task.Run(async () =>
            {
                string query = $"Insert into emailConfig OUTPUT inserted.* values(@Email,@AccessToken,@RefreshToken,@ExpiredTime)";

                using (var con = this.connection.connection())
                {
                    return await con.QueryFirstOrDefaultAsync<EmailConfig>(query, emailConfig);
                }
            });
        }

        public async Task<EmailConfig> UpdateEmailConfig(EmailConfig EmailConfig)
        {
            return await Task.Run(async () =>
            {
                string query = $"update EmailConfig set AccessToken=@AccessToken,ExpiredTime=@ExpiredTime where RefreshToken=@RefreshToken and Id=@Id";

                using (var con = this.connection.connection())
                {
                    return await con.QueryFirstOrDefaultAsync<EmailConfig>(query, EmailConfig);
                }
            });
        }

        public async Task DeleteEmailConfig()
        {
            await Task.Run(async () =>
           {
               string query = $"Truncate table EmailConfig";

               using (var con = this.connection.connection())
               {
                   await con.ExecuteAsync(query);
               }
           });
        }
    }
}