using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.OpenApi;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using SkillHub.Services.Interface;
using SkillHub.Services.Implementation;
using SkillHub.Services;

using SkillHub.Data;

using SkillHub.Services;
using SkillHub.SmtpSetting;
using SkillHub.Repositories.Implementation;
using SkillHub.Repositories.Interfaces;
using SkillHub.Helper;
using UserService = SkillHub.Services.UserService;
using OtpService = SkillHub.Services.Implementation.OtpService;
var builder = WebApplication.CreateBuilder(args);
var secretKey = builder.Configuration["Jwt:SecretKey"];

if (string.IsNullOrEmpty(secretKey))
{
    throw new InvalidOperationException("JWT secret key is not set in the environment variables.");
}
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173")  // React's default port in development
              .AllowAnyHeader()
              .AllowCredentials()
              .AllowAnyMethod();
    });
});
builder.Services.AddControllers().AddNewtonsoftJson(options =>
{
    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
});
// Add services to the container.


builder.Services.AddControllers();
builder.Services.AddDbContext<UserDbContext>(options => {
    _ = options.UseMySQL(builder.Configuration.GetConnectionString("users"));
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey))
        };
    });

// Add authorization
builder.Services.AddSingleton<AppSettings>();
builder.Services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));
builder.Services.AddAuthorization();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.Configure<SmtpSettings>(builder.Configuration.GetSection("Smtp"));
builder.Services.AddScoped<IOtpService, OtpService>();
builder.Services.AddScoped<IOtpRepository, OtpRepository>();
builder.Services.AddScoped<IForgotPasswordService, ForgotPasswordService>();
builder.Services.AddHostedService<OtpCleanupService>();
builder.Services.AddTransient<IEmailService, EmailService>();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IUserService, UserService>();
var app = builder.Build();


if (app.Environment.IsProduction())
{
    app.UseDefaultFiles(); // Look for index.html
    app.UseStaticFiles(); // Serve static files (like JS, CSS, etc.)
}
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AllowReactApp");
//app.UseCors("AllowReactApp");
app.UseMiddleware<JwtMiddleware>();
app.UseAuthentication();  // Ensure authentication middleware is used before authorization
app.UseAuthorization();
builder.Services.AddEndpointsApiExplorer(); // For API endpoint exploration
builder.Services.AddSwaggerGen(); // Add Swagger generator for API documentation



app.MapControllers();


app.Run();
