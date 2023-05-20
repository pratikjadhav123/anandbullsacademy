using System.Text.Json.Serialization;

namespace EducoreApp.DAL.DTO
{
    public class UserTokens
    {
        [JsonIgnore]
        public int UserTokenId { get; set; }

        public string RequestedBy { get; set; } = string.Empty;

        [JsonIgnore]
        public string RequestedType { get; set; } = string.Empty;

        public string Token { get; set; } = string.Empty;
        public DateTime ExpiredDate { get; set; }
    }
}