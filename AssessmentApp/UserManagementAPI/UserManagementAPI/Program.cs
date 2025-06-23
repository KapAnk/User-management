using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();
// Use CORS
app.UseCors("AllowFrontend");
var users = new List<User>();

users.Add(new User { Name = "John", Surname = "Doe", Email = "john@example.com", Company = "Acme", JobTitle = "Developer" });


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast")
.WithOpenApi();

app.MapGet("/api/users", () => users);

app.MapPost("/api/users", ([FromBody] User user) =>
{
    user.Id = Guid.NewGuid();
    users.Add(user);
    return Results.Created($"/api/users/{user.Id}", user);
});

app.MapPut("/api/users/{id}", ([FromRoute] Guid id, [FromBody] User updatedUser) =>
{
    var user = users.FirstOrDefault(u => u.Id == id);
    if (user == null) return Results.NotFound();

    user.Name = updatedUser.Name;
    user.Surname = updatedUser.Surname;
    user.Email = updatedUser.Email;
    user.Company = updatedUser.Company;
    user.JobTitle = updatedUser.JobTitle;

    return Results.Ok(user);
});

app.MapDelete("/api/users/{id}", ([FromRoute] Guid id) =>
{
    var user = users.FirstOrDefault(u => u.Id == id);
    if (user == null) return Results.NotFound();

    users.Remove(user);
    return Results.NoContent();
});

app.Run();

internal record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}

record User
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Surname { get; set; }
    public string Email { get; set; }
    public string Company { get; set; }
    public string JobTitle { get; set; }
}