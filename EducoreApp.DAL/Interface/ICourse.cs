using EducoreApp.DAL.DTO;
using EducoreApp.DAL.Request;

namespace EducoreApp.DAL.Interface
{
    public interface ICourse
    {
        public Task<IEnumerable<Course>> GetCourse();

        public Task<Course> GetCourse(int CourseId);

        public Task<Course> GetCourseByMainCourseId(int MainCourseId);

        public Task<Course> SaveCourse(CourseRequest courseRequest);

        public Task<Course> UpdateCourse(Course Course, CourseRequest courseRequest);

        public Task<Course> DeleteCourse(Course Course);
    }
}