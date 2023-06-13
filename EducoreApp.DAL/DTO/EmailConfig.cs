namespace EducoreApp.DAL.DTO
{
    public class EmailConfig
    {
        public int Id { get; set; }
        public string? Email { get; set; }
        public string? AccessToken { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime ExpiredTime { get; set; }
    }
    public class Responces
    {
        public string? access_token { get; set; }

        public string? refresh_token { get; set; }
        public string? id_token { get; set; }

    }
    public class EmailCredentials
    {
        public string clientID { get; set; }=String.Empty;
        public string clientSecret { get; set; } = String.Empty;
        public string scope { get; set; } = String.Empty;
        public string authUri { get; set; } = String.Empty;
        public string tokenUri { get; set; } = String.Empty;
        public string redirectUri { get; set; } = String.Empty;

    }
}