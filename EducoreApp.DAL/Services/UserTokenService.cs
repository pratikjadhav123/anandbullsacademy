using Dapper;
using EducoreApp.DAL.Database;
using EducoreApp.DAL.DTO;
using EducoreApp.DAL.Interface;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace EducoreApp.DAL.Services
{
    public class UserTokenService : IUserTokens
    {
        private DatabaseConnection connection;
        private IConfiguration configuration;

        public UserTokenService(DatabaseConnection connection, IConfiguration configuration)
        {
            this.connection = connection;
            this.configuration = configuration;
        }

        public async Task<UserTokens> GenerateToken(Users user)
        {
            return await Task.Run(async () =>
            {
                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, user.FirstName),
                    new Claim(JwtRegisteredClaimNames.Email, user.Email),
                    new Claim("Date", DateTime.UtcNow.ToString()),
                    new Claim("UserId", user.UserId.ToString()),
                    new Claim(ClaimTypes.Role, user.Role),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };
                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this.configuration["JwtAuth:Key"]));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(this.configuration["JwtAuth:Issuer"],
                this.configuration["JwtAuth:Issuer"],
                claims,
                expires: DateTime.UtcNow.AddHours(48),
                signingCredentials: credentials);

                string tokens = new JwtSecurityTokenHandler().WriteToken(token);
                UserTokens userTokens = await this.SaveAuthToken(user, tokens);
                return userTokens;
            });
        }

        public async Task<UserTokens> GetUserToken(string RequestedBy, string RequestedType)
        {
            return await Task.Run(async () =>
            {
                using (var con = this.connection.connection())
                {
                    UserTokens UserTokens = await con.QueryFirstOrDefaultAsync<UserTokens>("Select * from UserTokens where RequestedBy=@RequestedBy and RequestedType=@RequestedType", new { RequestedBy, RequestedType });
                    return UserTokens;
                }
            });
        }

        public async Task<UserTokens> SaveUserToken(string Email, string otp, string RequestedType)
        {
            return await Task.Run(async () =>
            {
                UserTokens UserTokens = new UserTokens();
                UserTokens.RequestedBy = Email;
                UserTokens.RequestedType = RequestedType;
                UserTokens.Token = otp;
                UserTokens.ExpiredDate = DateTime.UtcNow.AddHours(48);

                string query = "Insert into UserTokens OUTPUT inserted.* values(@RequestedBy,@RequestedType,@Token,@ExpiredDate)";

                using (var con = this.connection.connection())
                {
                    UserTokens user = await con.QueryFirstOrDefaultAsync<UserTokens>(query, UserTokens);
                    return user;
                }
            });
        }

        public async Task<UserTokens> SaveAuthToken(Users users, string Token)
        {
            return await Task.Run(async () =>
            {
                UserTokens UserTokens = new UserTokens();
                UserTokens.RequestedBy = users.Email;
                UserTokens.RequestedType = "User Token";
                UserTokens.Token = Token;
                UserTokens.ExpiredDate = DateTime.UtcNow.AddDays(1);

                string query = "Insert into UserTokens OUTPUT inserted.* values(@RequestedBy,@RequestedType,@Token,@ExpiredDate)";

                using (var con = this.connection.connection())
                {
                    UserTokens user = await con.QueryFirstOrDefaultAsync<UserTokens>(query, UserTokens);
                    return user;
                }
            });
        }

        public async Task<UserTokens> DeleteUser(UserTokens UserTokens)
        {
            return await Task.Run(async () =>
            {
                using (var con = this.connection.connection())
                {
                    await con.QueryFirstOrDefaultAsync<UserTokens>("Delete UserTokens where UserTokenId=@UserTokenId", UserTokens);
                    return UserTokens;
                }
            });
        }

        public async Task LogoutUser(string RequestedBy)
        {
            await Task.Run(async () =>
           {
               string RequestedType = "User Token";
               using (var con = this.connection.connection())
               {
                   await con.QueryFirstOrDefaultAsync<UserTokens>("Delete UserTokens where RequestedBy=@RequestedBy and RequestedType=@RequestedType", new { RequestedBy, RequestedType });
               }
           });
        }

        public async Task<UserTokens> GetToken(string token, string RequestedType)
        {
            using (var db = this.connection.connection())
            {
                return await db.QueryFirstOrDefaultAsync<UserTokens>("select * from UserTokens where Token=@Token and RequestedType=@RequestedType", new { token, RequestedType });
            }
        }

        public async Task<UserTokens> GetOTP(int Token, string RequestedType)
        {
            using (var db = this.connection.connection())
            {
                return await db.QueryFirstOrDefaultAsync<UserTokens>("select * from UserTokens where Token=@Token and RequestedType=@RequestedType", new { Token, RequestedType });
            }
        }

        public async Task<UserTokens> DeleteToken(string token)
        {
            using (var db = this.connection.connection())
            {
                return await db.QueryFirstOrDefaultAsync<UserTokens>("delete from UserTokens where Token=@Token", new { token });
            }
        }
    }
}