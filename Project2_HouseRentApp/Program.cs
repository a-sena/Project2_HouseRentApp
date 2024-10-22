using HouseRentApp.DAL;
using Microsoft.EntityFrameworkCore;
using Serilog;
using Microsoft.AspNetCore.Identity;
using HouseRentApp.AppDB;


var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("Connection") ?? throw new InvalidOperationException("Connection string 'DbConnection' not found.");

// Add services to the container.
builder.Services.AddControllersWithViews();



//DbContext
builder.Services.AddDbContext<Db>(options =>
{
    options.UseSqlite(builder.Configuration["ConnectionStrings:Connection"]);

});


builder.Services.AddDefaultIdentity<IdentityUser>(options => options.SignIn.RequireConfirmedAccount = false)
   //RoleBased Authorization 
   .AddRoles<IdentityRole>()

    .AddEntityFrameworkStores<Db>();




builder.Services.AddScoped<IApartmentRepo, ApartmentRepo>();
builder.Services.AddRazorPages();

//Logging of the information 
var loggerConfiguration = new LoggerConfiguration()
    .MinimumLevel.Information().
    WriteTo.File
    ($"Logs/app_{DateTime.Now:yyyyMMdd__HHmmss}.log");


//filtering each log event
loggerConfiguration.Filter.ByExcluding(e => e.Properties.TryGetValue("SourceContext", out var value) &&
e.Level == Serilog.Events.LogEventLevel.Information &&
e.MessageTemplate.Text.Contains("Executed DbCommand"));

var logger = loggerConfiguration.CreateLogger();
builder.Logging.AddSerilog(logger);


//Cors Policy for react 
builder.Services.AddCors(options =>
{
    options.AddPolicy("ClientAccess", builder =>
    {
        builder.WithOrigins("https://localhost:44431")
               .AllowAnyHeader()
               .AllowAnyMethod()
               .AllowCredentials();

    });
});

var app = builder.Build();
app.UseCors("ClientAccess");
// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseRouting();
//app.UseAuthentication(); ;
//app.UseAuthorization(); 

DbInit.Seed(app);

/*app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");*/

app.MapControllerRoute(
    name: "root",
    pattern: "",
    defaults: new { controller = "Apartment", action = "Grid" });
app.MapDefaultControllerRoute();
app.MapControllers();
app.MapRazorPages();














app.Run();

