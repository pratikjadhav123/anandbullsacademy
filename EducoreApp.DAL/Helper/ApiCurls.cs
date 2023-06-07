using Microsoft.Extensions.Configuration;
using RestSharp;

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
    }
}