using EducoreApp.DAL.DTO;

namespace EducoreApp.DAL.Interface
{
    public interface IUserTokens
    {
        public Task<UserTokens> GenerateToken(Users user);

        public Task<UserTokens> GetUserToken(string RequestedBy, string RequestedType);

        public Task<UserTokens> SaveUserToken(Users users, string RequestedType);

        public Task<UserTokens> SaveAuthToken(Users users, string Token);

        public Task<UserTokens> DeleteUser(UserTokens UserTokens);

        public Task<UserTokens> GetToken(string token);
        public Task<UserTokens> GetOTP(int Token, string RequestedType);
        public Task LogoutUser(string RequestedBy);
        public Task<UserTokens> DeleteToken(string token);
    }
}