using EducoreApp.DAL.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EducoreApp.DAL.Interface
{
    public interface IEmailService
    {
        public Task SendEmail(Users user, string RequestedType);
    }
}
