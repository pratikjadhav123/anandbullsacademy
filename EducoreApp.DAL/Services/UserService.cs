using Dapper;
using EducoreApp.DAL.Database;
using EducoreApp.DAL.DTO;
using EducoreApp.DAL.Interface;
using EducoreApp.DAL.Request;

namespace EducoreApp.DAL.Services
{
    public class UserService : IUser
    {
        private DatabaseConnection connection;
        private IEmailService emailService;

        public UserService(DatabaseConnection connection, IEmailService emailService)
        {
            this.connection = connection;
            this.emailService = emailService;
        }

        public async Task<IEnumerable<Users>> GetUsers()
        {
            return await Task.Run(async () =>
            {
                using (var con = this.connection.connection())
                {
                    IEnumerable<Users> users = (await con.QueryAsync<Users>("Select * from Users")).ToList();
                    return users;
                }
            });
        }

        public async Task<Users> GetUser(int UserId)
        {
            return await Task.Run(async () =>
            {
                using (var con = this.connection.connection())
                {
                    Users users = await con.QueryFirstOrDefaultAsync<Users>("Select * from Users where UserId=@UserId", new { UserId });
                    return users;
                }
            });
        }

        public async Task<Users> SaveUser(UserRequest userRequest)
        {
            return await Task.Run(async () =>
            {
                Users users = new Users();
                users.FirstName = userRequest.FirstName;
                users.LastName = userRequest.LastName;
                users.Email = userRequest.Email;
                users.Password = BCrypt.Net.BCrypt.HashPassword(userRequest.ConfirmPassword);
                users.Mobile = userRequest.Mobile;

                string query = "Insert into Users OUTPUT inserted.* values(@FirstName,@LastName,@Email,@Password,@Mobile,@Active,@Role,@EmailVerification,@OTPVerification)";

                using (var con = this.connection.connection())
                {
                    Users user = await con.QueryFirstOrDefaultAsync<Users>(query, users);
                    await this.emailService.SendEmail(user, "Confirm Email");
                    return user;
                }
            });
        }

        public async Task<Users> UpdateUser(Users users, UserRequest userRequest)
        {
            return await Task.Run(async () =>
            {
                users.FirstName = userRequest.FirstName;
                users.LastName = userRequest.LastName;
                users.Email = userRequest.Email;
                users.Password = BCrypt.Net.BCrypt.HashPassword(userRequest.Password);
                users.Mobile = userRequest.Mobile;

                string query = "Update Users set FirstName=@FirstName,LastName=@LastName,Email=@Email,Password=@Password," +
                               "Mobile=@Mobile where UserId=@UserId";

                using (var con = this.connection.connection())
                {
                    await con.QueryFirstOrDefaultAsync<Users>(query, users);
                    return users;
                }
            });
        }

        public async Task<Users> DeleteUser(Users users)
        {
            return await Task.Run(async () =>
            {
                using (var con = this.connection.connection())
                {
                    await con.QueryFirstOrDefaultAsync<Users>("Delete Users where UserId=@UserId", users);
                    return users;
                }
            });
        }

        public async Task<Users> GetUserByEmail(string Email)
        {
            return await Task.Run(async () =>
            {
                using (var con = this.connection.connection())
                {
                    Users users = await con.QueryFirstOrDefaultAsync<Users>("Select * from Users where Email=@Email", new { Email });
                    return users;
                }
            });
        }
        public async Task<Users> GetUserByMobile(string Mobile)
        {
            return await Task.Run(async () =>
            {
                using (var con = this.connection.connection())
                {
                    Users users = await con.QueryFirstOrDefaultAsync<Users>("Select * from Users where Mobile=@Mobile", new { Mobile });
                    return users;
                }
            });
        }
        public async Task<Users> UpdatePassword(Users users, string Password)
        {
            return await Task.Run(async () =>
            {
                users.Password = BCrypt.Net.BCrypt.HashPassword(Password);
                using (var con = this.connection.connection())
                {
                    await con.QueryFirstOrDefaultAsync<Users>("Update Users set Password=@Password where UserId=@UserId", users);
                    return users;
                }
            });
        }
    }
}