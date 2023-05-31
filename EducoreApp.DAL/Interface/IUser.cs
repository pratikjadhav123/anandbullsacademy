using EducoreApp.DAL.DTO;
using EducoreApp.DAL.Request;

namespace EducoreApp.DAL.Interface
{
    public interface IUser
    {
        public Task<IEnumerable<Users>> GetUsers();

        public Task<Users> GetUser(int UserId);

        public Task<Users> SaveUser(UserRequest userRequest);

        public Task<Users> UpdateUser(Users users, UserRequest userRequest);

        public Task<Users> DeleteUser(Users users);

        public Task<Users> GetUserByEmail(string Email);

        public Task<Users> GetUserByMobile(string Mobile);

        public Task<Users> UpdatePassword(Users users, string Password);
    }
}