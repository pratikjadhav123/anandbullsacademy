global using EducoreApp.DAL.Database;
global using EducoreApp.DAL.DTO;
global using EducoreApp.DAL.Interface;
global using EducoreApp.DAL.Request;
global using EducoreApp.DAL.Services;
global using EducoreApp.DAL.Helper;
global using EducoreApp.DAL.Middlewares;
using Hangfire;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using Swashbuckle.AspNetCore.SwaggerUI;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();

//Hangfire services
builder.Services.AddHangfire(x =>
{
    x.UseSqlServerStorage(builder.Configuration.GetConnectionString("Database"));
});
//JSON responce object in camel case
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.PropertyNamingPolicy = null;
});

//SMTP configuration class connecttion
builder.Services.Configure<SMTPConfigModel>(builder.Configuration.GetSection("SMTPConfig"));

//References
builder.Services.AddSingleton<UploadFiles>();

builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
builder.Services.AddSingleton<IAuthorizationMiddlewareResultHandler, AuthorizationMiddlewareService>();
builder.Services.AddSingleton<IEmailService, EmailService>();
builder.Services.AddSingleton<DatabaseConnection>();
builder.Services.AddSingleton<IUser, UserService>();
builder.Services.AddSingleton<ICourse, CourseService>();
builder.Services.AddSingleton<IVideos, VideoService>();
builder.Services.AddSingleton<IUserTokens, UserTokenService>();

builder.Services.AddSwaggerGen(option =>
{
    option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "JWT Authorization header using the Bearer scheme.",
    });
    option.OperationFilter<AuthorizationOperationFilter>();
    
});

//services cors
builder.Services.AddCors(p => p.AddPolicy("MyCorsPolicy", builder =>
{
    builder.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin();
}));

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["JwtAuth:Issuer"],
        ValidAudience = builder.Configuration["JwtAuth:Issuer"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JwtAuth:Key"])),
        ClockSkew = TimeSpan.Zero
    };
});

builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.Limits.MaxRequestBodySize = 3221225472;
});
var app = builder.Build();


app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.DocExpansion(DocExpansion.None);
});

app.UseRouting();
app.UseCors("MyCorsPolicy");

app.UseStaticFiles();
app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();
app.UseHangfireDashboard();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();