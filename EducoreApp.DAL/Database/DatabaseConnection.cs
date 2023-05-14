using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace EducoreApp.DAL.Database
{
    public class DatabaseConnection
    {
        private IConfiguration configuration;

        public DatabaseConnection(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public IDbConnection connection()
        {
            string conn = this.configuration.GetConnectionString("Database");
            return new SqlConnection(conn);
        }
    }
}