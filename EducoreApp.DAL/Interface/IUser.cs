using EducoreApp.DAL.DTO;
using EducoreApp.DAL.Request;

namespace EducoreApp.DAL.Interface
{
    public interface IUser
    {
        public Task<IEnumerable<Users>> GetUsers();

        public Task<Users> GetUser(int UserId);

        public Task<TempUsers> ConfirmOTP(int OTP);

        public Task<TempUsers> SaveTempUser(UserRequest userRequest);

        public Task<Users> SaveUser(TempUsers tempUsers);

        public Task<Users> UpdateUser(Users users, UserRequest userRequest);

        public Task<Users> DeleteUser(Users users);

        public Task DeleteTempUser(TempUsers tempUsers);

        public Task<Users> GetUserByEmail(string Email);

        public Task<Users> GetUserByMobile(string Mobile);

        public Task<Users> UpdatePassword(Users users, string Password);

        public Task<Users> UpdateCourseStatus(Users users, Course course);
        public Task<Users> UpdateOTP(Users users);
    }
}