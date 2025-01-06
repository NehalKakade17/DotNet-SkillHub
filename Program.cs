using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;


using SkillHub.Data;

using SkillHub.Services;
var builder = WebApplication.CreateBuilder(args);
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
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AllowReactApp");
//app.UseCors("AllowReactApp");

app.UseAuthorization();

app.MapControllers();


app.Run();
