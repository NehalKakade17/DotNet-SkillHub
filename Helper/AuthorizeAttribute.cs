using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using SkillHub.Data.Entities;

namespace SkillHub.Helper
{
    public class AuthorizeAttribute
    {
        [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
        public class AuthoriseAttribute : Attribute
        {
            public void onAuthorization(AuthorizationFilterContext context)
            {
                var user = (User)context.HttpContext.Items["User"];
                if (user == null)
                {
                    context.Result = new JsonResult(new { message = "Unauthorized" }) { StatusCode = StatusCodes.Status401Unauthorized };
                }
            }
        }
    }
}
