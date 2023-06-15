using EducoreApp.DAL.DTO;
using Microsoft.Extensions.Configuration;
using RestSharp;
using System.IdentityModel.Tokens.Jwt;

namespace EducoreApp.DAL.Helper
{
    public class ApiCurls
    {
        private IConfiguration configuration;

        public ApiCurls(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public async Task<string> GetResponce(string URL)
        {
            using (var client = new RestClient())
            {
                var request = new RestRequest(URL, Method.Get);
                request.AddHeader("Authorization", "Apisecret " + this.configuration["APIKey"]);
                RestResponse response = await client.ExecuteAsync(request);
                return response.Content;
            }
        }

        public async Task<string> GetVideoResponce(string URL, Users users)
        {
            using (var client = new HttpClient())
            {
                var request = new HttpRequestMessage(HttpMethod.Post, URL);
                request.Headers.Add("Authorization", "Apisecret " + this.configuration["APIKey"]);
                var content = new StringContent("{\"annotate\":\"[{'type':'rtext', 'text':' " + users.FirstName + ", " + users.Email + "', 'alpha':'0.60', 'color':'0xFF0000','size':'25','interval':'5000'}]\"}", null, "text/plain");
                request.Content = content;
                var response = await client.SendAsync(request);
                response.EnsureSuccessStatusCode();
                return await response.Content.ReadAsStringAsync();
            }
        }

        public async Task<string> GetTokens(string URL)
        {
            using (var client = new HttpClient())
            {
                var request = new HttpRequestMessage(HttpMethod.Post, URL);
                var response = await client.SendAsync(request);
                response.EnsureSuccessStatusCode();
                string token = await response.Content.ReadAsStringAsync();
                return token;
            }
        }

        public string GetEmail(string? token)
        {
            var jwtHandler = new JwtSecurityTokenHandler();
            var jwtToken = jwtHandler.ReadToken(token) as JwtSecurityToken;

            var emailClaim = jwtToken.Claims.FirstOrDefault(claim => claim.Type == "email");
            return emailClaim.Value;
        }
    }
}