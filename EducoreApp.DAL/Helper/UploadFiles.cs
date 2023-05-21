using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

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

        public async Task<string> SaveVideo(IFormFile videoFile)
        {
            string fileName = Guid.NewGuid().ToString() + Path.GetExtension(videoFile.FileName);

            string uploadsFolder = Path.Combine(_hostEnvironment.WebRootPath, "uploads");

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

        public string GetVideoPath(string filename)
        {
            var webRootPath = _hostEnvironment.WebRootPath;
            var imagePath = Path.Combine(webRootPath, "uploads", filename);

            if (System.IO.File.Exists(imagePath))
            {
                return this.configuration["BackEndUrl"] + "/uploads/" + filename;
            }
            else
            {
                return null;
            }
        }
        public string DeleteFile(string file)
        {
            var webRootPath = _hostEnvironment.WebRootPath;
            var imagePath = Path.Combine(webRootPath, "uploads", file);

            if (!System.IO.File.Exists(imagePath))
            {
                return null;
            }
            System.IO.File.Delete(imagePath);
            return "deleted";
        }
    }
}