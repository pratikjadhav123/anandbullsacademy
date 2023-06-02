using EducoreApp.DAL.DTO;
using EducoreApp.DAL.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Policy;
using Microsoft.AspNetCore.Http;
using System.Net;

namespace EducoreApp.DAL.Middlewares
{
    public class AuthorizationMiddlewareService : IAuthorizationMiddlewareResultHandler
    {
        public IUserTokens _iUserTokenService;

        public AuthorizationMiddlewareService(IUserTokens iUserTokenService)
        {
            _iUserTokenService = iUserTokenService;
        }

        private readonly IAuthorizationMiddlewareResultHandler DefaultHandler = new AuthorizationMiddlewareResultHandler();

        public async Task HandleAsync(RequestDelegate next, HttpContext context, AuthorizationPolicy policy, PolicyAuthorizationResult authorizeResult)
        {
            var authorizationHeader = context.Request.Headers["Authorization"].ToString();
            if (!string.IsNullOrEmpty(authorizationHeader))
            {
                var jwtEncodedString = authorizationHeader[7..];
                UserTokens user = await _iUserTokenService.GetToken(jwtEncodedString, "User Token");
                if (user == null)
                {
                    context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                    await context.Response.WriteAsJsonAsync(new { message = "Please login again" });
                    return;
                }
                if (user.ExpiredDate <= DateTime.Now)
                {
                    await _iUserTokenService.DeleteToken(jwtEncodedString);
                    context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                    await context.Response.WriteAsJsonAsync(new { message = "User Session time is expired" });
                    return;
                }
            }
            if (authorizeResult.Challenged)
            {
                context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                await context.Response.WriteAsJsonAsync(new { message = "Unauthorized" });
                return;
            }
            if (authorizeResult.Forbidden)
            {
                context.Response.StatusCode = (int)HttpStatusCode.Forbidden;
                await context.Response.WriteAsJsonAsync(new { message = "Only Admin have access to open this!!!" });
                return;
            }
            await DefaultHandler.HandleAsync(next, context, policy, authorizeResult);
        }
    }
}