using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System.Text;

namespace EducoreApp.DAL.Helper
{
    public class UploadFiles
    {
        private IWebHostEnvironment _hostEnvironment;
        private IConfiguration configuration;

        public UploadFiles(IWebHostEnvironment hostEnvironment, IConfiguration configuration)
        {
            _hostEnvironment = hostEnvironment;
            this.configuration = configuration;
        }

        public async Task<string> SaveVideo(IFormFile videoFile, string foldername)
        {
            string fileName = Guid.NewGuid().ToString() + Path.GetExtension(videoFile.FileName);

            string uploadsFolder = Path.Combine(_hostEnvironment.WebRootPath, foldername);

            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }
            string filePath = Path.Combine(uploadsFolder, fileName);

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await videoFile.CopyToAsync(fileStream);
            }
            return fileName;
        }

        public string GetVideoPath(string filename, string foldername)
        {
            var webRootPath = _hostEnvironment.WebRootPath;
            var imagePath = Path.Combine(webRootPath, foldername , filename);

            if (System.IO.File.Exists(imagePath))
            {
                return this.configuration["BackEndUrl"] + @"/" + foldername + @"/" + filename;
            }
            else
            {
                return null;
            }
        }
        public string GetAvatarPath(string filename, string foldername)
        {
            var webRootPath = _hostEnvironment.WebRootPath;
            var imagePath = Path.Combine(webRootPath, foldername, filename);

            if (System.IO.File.Exists(imagePath))
            {
                return this.configuration["BackEndUrl"] + @"/" + foldername + @"/" + filename;
            }
            else
            {
                return this.configuration["BackEndUrl"] + "/user.jpg";
            }
        }
        public string DeleteFile(string file, string foldername)
        {
            var webRootPath = _hostEnvironment.WebRootPath;
            var imagePath = Path.Combine(webRootPath, foldername, file);

            if (!System.IO.File.Exists(imagePath))
            {
                return null;
            }
            System.IO.File.Delete(imagePath);
            return "deleted";
        }
       
    }
    public static class RandomStringGenerator
    {
        private static Random random = new Random();

        public static string GenerateRandomString()
        {
            int length = 7;
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            StringBuilder stringBuilder = new StringBuilder(length);

            while (stringBuilder.Length < length)
            {
                stringBuilder.Append(chars[random.Next(chars.Length)]);
            }

            return stringBuilder.ToString();
        }
    }
}