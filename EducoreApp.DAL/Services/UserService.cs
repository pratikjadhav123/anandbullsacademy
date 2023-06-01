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

        public async Task<TempUsers> ConfirmOTP(int OTP)
        {
            return await Task.Run(async () =>
            {
                using (var con = this.connection.connection())
                {
                    TempUsers users = await con.QueryFirstOrDefaultAsync<TempUsers>("Select * from TempUsers where OTP=@OTP", new { OTP });
                    return users;
                }
            });
        }


        public async Task<TempUsers> SaveTempUser(UserRequest userRequest)
        {
            return await Task.Run(async () =>
            {
                TempUsers users = new TempUsers();
                users.FirstName = userRequest.FirstName;
                users.LastName = userRequest.LastName;
                users.Email = userRequest.Email;
                users.Password = BCrypt.Net.BCrypt.HashPassword(userRequest.ConfirmPassword);
                users.Mobile = userRequest.Mobile;
                users.OTP = new Random().Next(1000, 9999);
                string query = $"Insert into TempUsers OUTPUT inserted.* values(@FirstName,@LastName,@Email,@Password,@Mobile,@OTP)";

                using (var con = this.connection.connection())
                {
                    return await con.QueryFirstOrDefaultAsync<TempUsers>(query, users);
                }
            });
        }

        public async Task<Users> SaveUser(TempUsers tempUsers)
        {
            return await Task.Run(async () =>
            {
                Users users = new Users();
                users.FirstName = tempUsers.FirstName;
                users.LastName = tempUsers.LastName;
                users.Email = tempUsers.Email;
                users.Password = tempUsers.Password;
                users.Mobile = tempUsers.Mobile;
                users.OTPVerification = DateTime.Now;

                string query = "Insert into Users OUTPUT inserted.* values(@CourseId,@FirstName,@LastName,@Email,@Password,@Mobile,@Active,@Role,@EmailVerification,@OTPVerification)";

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

        public async Task DeleteTempUser(TempUsers tempUsers)
        {
            await Task.Run(async () =>
           {
               using (var con = this.connection.connection())
               {
                   await con.QueryFirstOrDefaultAsync<TempUsers>("Delete TempUsers where OTP=@OTP", tempUsers);
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

        public async Task<Users> UpdateCourseStatus(Users users, Course course)
        {
            return await Task.Run(async () =>
            {
                users.CourseId = course.CourseId;

                string query = "Update Users set CourseId=@CourseId where UserId=@UserId";

                using (var con = this.connection.connection())
                {
                    await con.QueryFirstOrDefaultAsync<Users>(query, users);
                    return users;
                }
            });
        }
        public async Task<Users> UpdateOTP(Users users)
        {
            return await Task.Run(async () =>
            {
                users.OTPVerification = DateTime.Now;
                using (var con = this.connection.connection())
                {
                    await con.QueryFirstOrDefaultAsync<Users>("Update Users set OTPVerification=@OTPVerification where UserId=@UserId", users);
                    return users;
                }
            });
        }
    }
}