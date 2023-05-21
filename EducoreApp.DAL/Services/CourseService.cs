﻿using Dapper;
using EducoreApp.DAL.Database;
using EducoreApp.DAL.DTO;
using EducoreApp.DAL.Interface;
using EducoreApp.DAL.Request;

namespace EducoreApp.DAL.Services
{
    public class CourseService : ICourse
    {
        private DatabaseConnection connection;

        public CourseService(DatabaseConnection connection)
        {
            this.connection = connection;
        }

        public async Task<IEnumerable<Course>> GetCourse()
        {
            return await Task.Run(async () =>
            {
                using (var con = this.connection.connection())
                {
                    IEnumerable<Course> courses = (await con.QueryAsync<Course>("Select * from Courses")).ToList();
                    return courses;
                }
            });
        }

        public async Task<Course> GetCourse(int CourseId)
        {
            return await Task.Run(async () =>
            {
                using (var con = this.connection.connection())
                {
                    Course Course = await con.QueryFirstOrDefaultAsync<Course>("Select * from Courses where CourseId=@CourseId", new { CourseId });
                    return Course;
                }
            });
        }

        public async Task<Course> SaveCourse(CourseRequest courseRequest)
        {
            return await Task.Run(async () =>
            {
                Course Course = new Course();
                Course.Title = courseRequest.Title;
                Course.Description = courseRequest.Description;

                string query = "Insert into Courses OUTPUT inserted.* values(@Title,@Description,@CreatedAt,@UpdatedAt)";

                using (var con = this.connection.connection())
                {
                    Course course = await con.QueryFirstOrDefaultAsync<Course>(query, Course);
                    return course;
                }
            });
        }

        public async Task<Course> UpdateCourse(Course Course, CourseRequest courseRequest)
        {
            return await Task.Run(async () =>
            {
                Course.Title = courseRequest.Title;
                Course.Description = courseRequest.Description;
                Course.UpdatedAt = DateTime.Now;

                string query = "Update Courses set Title=@Title,Description=@Description,UpdatedAt=@UpdatedAt" +
                               " where CourseId=@CourseId";

                using (var con = this.connection.connection())
                {
                    await con.QueryFirstOrDefaultAsync<Course>(query, Course);
                    return Course;
                }
            });
        }

        public async Task<Course> DeleteCourse(Course Course)
        {
            return await Task.Run(async () =>
            {
                using (var con = this.connection.connection())
                {
                    await con.QueryFirstOrDefaultAsync<Course>("Delete Courses where CourseId=@CourseId", Course);
                    return Course;
                }
            });
        }
    }
}