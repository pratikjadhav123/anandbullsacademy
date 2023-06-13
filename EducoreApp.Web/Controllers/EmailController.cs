using EASendMail;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace EducoreApp.Web.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("[controller]/[action]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly EmailCredentials _credentials;
        private ApiCurls apiCurls;
        private IEmailService emailService;

        public EmailController(IOptions<EmailCredentials> credentials, ApiCurls apiCurls, IEmailService emailService)
        {
            _credentials = credentials.Value;
            this.apiCurls = apiCurls;
            this.emailService = emailService;
        }

        [HttpGet]
        public string GetUrl()
        {
            string authorizationRequest = $"{_credentials.authUri}&client_id={_credentials.clientID}&scope={_credentials.scope}&response_type=code&redirect_uri={_credentials.redirectUri}";

            return authorizationRequest;
        }

        [HttpGet]
        public async Task<ActionResult> GetAccessToken(string code)
        {
            var request = $"{_credentials.tokenUri}?code={code}&redirect_uri={_credentials.redirectUri}&client_id={_credentials.clientID}&client_secret={_credentials.clientSecret}&grant_type=authorization_code";
            string token = await this.apiCurls.GetTokens(request);
            Responces? responces = JsonConvert.DeserializeObject<Responces>(token);

            string email = this.apiCurls.GetEmail(responces.id_token);

            EmailConfig emailConfig = new EmailConfig()
            {
                Email = email,
                AccessToken = responces.access_token,
                RefreshToken = responces.refresh_token,
                ExpiredTime = DateTime.Now.AddMinutes(30)
            };
            await this.emailService.DeleteEmailConfig();
            EmailConfig emailConfig1 = await this.emailService.SaveEmailConfig(emailConfig);
            return Ok(emailConfig1);
        }
/*
        [HttpGet]
        public async Task<ActionResult<EmailConfig>> GetEmailConfig()
        {
            EmailConfig emailConfig = await this.emailService.GetEmailConfig();
            if (emailConfig == null)
            {
                return NotFound();
            }
            return Ok(emailConfig);
        }
*/
       /* [HttpPost]
        public string SendEmail(string userEmail, string to, string accessToken)
        {
            SmtpServer oServer = new SmtpServer("smtp.gmail.com");

            oServer.ConnectType = SmtpConnectType.ConnectSSLAuto;

            oServer.Port = 587;

            oServer.AuthType = SmtpAuthType.XOAUTH2;

            oServer.User = "techxcellence.in@gmail.com";

            oServer.Password = accessToken;

            SmtpMail oMail = new SmtpMail("TryIt");

            oMail.From = "techxcellence.in@gmail.com";

            oMail.To = "satyamsank1998@gmail.com";

            oMail.Subject = "test email from gmail account with OAUTH 2";
            oMail.TextBody = "this is a test email sent from c# project with gmail.";

            SmtpClient oSmtp = new SmtpClient();
            oSmtp.SendMail(oServer, oMail);

            return "The email has been submitted to server successfully!";
        }
*/
        /*[HttpGet]
      public async Task<ActionResult> GetRefreshToken(string refresh_token)
       {
           var request = $"{tokenUri}?refresh_token={refresh_token}&redirect_uri={redirectUri}&client_id={clientID}&client_secret={clientSecret}&grant_type=refresh_token";
           string token = await this.apiCurls.GetTokens(request);
           return Ok(token);
       }*/
    }
}