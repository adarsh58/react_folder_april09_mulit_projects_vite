import React, { useState } from 'react';
import { Zap, Shield, Repeat, Layers, Database, Code, ChevronRight, ChevronLeft, Lock, Share2, Activity, Cpu, Clock, Terminal, Globe, HelpCircle } from 'lucide-react';

const CSharpAdvancedDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const topics = [
    {
      id: 'efcore',
      title: 'EF Core (Entity Framework)',
      desc: 'ORM & Database Management',
      usage: 'Migrations, Relationships, Performance',
      code: `// 1. Model Definition with Fluent API
public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options) {
    public DbSet<Product> Products { get; set; }

    protected override void OnModelCreating(ModelBuilder mb) {
        mb.Entity<Product>().Property(p => p.Name).IsRequired().HasMaxLength(100);
        mb.Entity<Product>().HasIndex(p => p.Category);
    }
}

// 2. Optimized Querying (AsNoTracking)
public async Task<List<Product>> GetCheapProducts() =>
    await _db.Products
        .AsNoTracking() // Performance boost for read-only
        .Where(p => p.Price < 100)
        .OrderBy(p => p.Name)
        .ToListAsync();

// 3. Transactions & Updates
using var tx = await _db.Database.BeginTransactionAsync();
_db.Products.Update(product);
await _db.SaveChangesAsync();
await tx.CommitAsync();`
    },
    {
      id: 'di',
      title: 'Dependency Injection (DI)',
      desc: 'Mastering Service Lifetimes',
      usage: 'Transient, Scoped, Singleton',
      code: `// 1. Service Definitions
// Transient: Created every time they are requested.
builder.Services.AddTransient<IMyTransient, MyTransient>();

// Scoped: Created once per client request (connection).
builder.Services.AddScoped<IMyScoped, MyScoped>();

// Singleton: Created the first time they are requested 
// and then every subsequent request uses the same instance.
builder.Services.AddSingleton<IMySingleton, MySingleton>();

// 2. Practical Example: GUID tracking
public interface IService { string Id { get; } }
public class MyService : IService { 
    public string Id { get; } = Guid.NewGuid().ToString()[..8]; 
}

// 3. Injection in Controller
public class MyController(
    IMyTransient trans1, IMyTransient trans2, 
    IMyScoped scoped1, IMyScoped scoped2,
    IMySingleton single) : ControllerBase 
{
    // trans1 != trans2 (Always new)
    // scoped1 == scoped2 (Same for this HTTP request)
    // single is same across ALL requests for ALL users
}`
    },
    {
      id: 'jwtauth',
      title: 'JWT Authentication',
      desc: 'Production-ready JWT Setup',
      usage: 'Identity, Security, Claims',
      code: `// 1. Setup in Program.cs
builder.Services.AddAuthentication(options => {
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options => {
    options.TokenValidationParameters = new TokenValidationParameters {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = "https://mysite.com",
        ValidAudience = "https://mysite.com",
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes("your_super_secret_32bit_key_here"))
    };
});

// 2. Controller with Policy-based Auth
[Authorize(Roles = "Admin")]
[HttpGet("secure-data")]
public IActionResult Get() => Ok("Only admins see this");`
    },
    {
      id: 'httpclient',
      title: 'IHttpClientFactory',
      desc: 'Resilient HTTP Calls',
      usage: 'Polly, Handlers, Typed Clients',
      code: `// 1. Typed Client with Resilience (Polly)
builder.Services.AddHttpClient<IWeatherService, WeatherService>(c => {
    c.BaseAddress = new Uri("https://api.weather.com/");
    c.Timeout = TimeSpan.FromSeconds(5);
})
.AddTransientHttpErrorPolicy(p => p.WaitAndRetryAsync(3, _ => TimeSpan.FromSeconds(2)));

// 2. The Typed Client Implementation
public class WeatherService(HttpClient http) : IWeatherService
{
    public async Task<Weather> GetForecastAsync()
    {
        // No need to manage HttpClient lifecycle, factory handles it!
        var response = await http.GetFromJsonAsync<Weather>("forecast");
        return response ?? throw new Exception("Failed to fetch");
    }
}`
    },
    {
      id: 'signalr',
      title: 'SignalR Real-time Hubs',
      desc: 'WebSockets & Push Notifications',
      usage: 'Live updates, Chat, Monitoring',
      code: `// 1. The Hub Class
public class ChatHub : Hub
{
    // Server-to-Client communication
    public async Task SendMessage(string user, string message)
    {
        // Broadcast to all connected clients
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }

    // Direct message to specific user
    public async Task SendPrivate(string userId, string msg) =>
        await Clients.User(userId).SendAsync("PrivateMsg", msg);
}

// 2. Registration & Endpoint Mapping
builder.Services.AddSignalR();
// ...
app.MapHub<ChatHub>("/chatHub");`
    },
    {
      id: 'mediatr',
      title: 'MediatR & CQRS',
      desc: 'Decoupling Logic from Controllers',
      usage: 'Command, Query, Notification',
      code: `// 1. The Request (Command)
public record CreateOrderCommand(int ProductId, int Qty) : IRequest<Guid>;

// 2. The Handler (Business Logic)
public class CreateOrderHandler(IOrderRepository repo) 
    : IRequestHandler<CreateOrderCommand, Guid>
{
    public async Task<Guid> Handle(CreateOrderCommand request, CancellationToken ct)
    {
        var orderId = await repo.CreateAsync(request.ProductId, request.Qty);
        return orderId;
    }
}

// 3. Controller (Slim)
[HttpPost]
public async Task<Guid> PlaceOrder(CreateOrderCommand cmd) => 
    await _mediator.Send(cmd);`
    },
    {
      id: 'background',
      title: 'Worker Services',
      desc: 'Long-running Background Tasks',
      usage: 'Cleanup, Batch processing, Queues',
      code: `// 1. The Worker Implementation
public class DatabaseCleanupWorker(ILogger<DatabaseCleanupWorker> logger, 
    IServiceScopeFactory scopeFactory) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            logger.LogInformation("Worker running at: {time}", DateTimeOffset.Now);
            
            // Background services are singletons, 
            // so we MUST create a scope for DB access!
            using (var scope = scopeFactory.CreateScope())
            {
                var db = scope.ServiceProvider.GetRequiredService<MyDbContext>();
                await db.PerformCleanupAsync();
            }

            await Task.Delay(TimeSpan.FromHours(24), stoppingToken);
        }
    }
}`
    },
    {
      id: 'caching',
      title: 'Advanced Caching',
      desc: 'Memory vs Distributed Caching',
      usage: 'Redis, Performance, Throughput',
      code: `// 1. IMemoryCache (Local)
public async Task<User> GetUser(int id) {
    return await _cache.GetOrCreateAsync($"user_{id}", async entry => {
        entry.SlidingExpiration = TimeSpan.FromMinutes(5);
        return await _db.Users.FindAsync(id);
    });
}

// 2. IDistributedCache (Redis - Shared across server farm)
var userJson = await _distCache.GetStringAsync("user_101");
if (userJson == null) {
    var user = await _db.Users.FindAsync(101);
    await _distCache.SetStringAsync("user_101", JsonSerializer.Serialize(user), 
        new DistributedCacheEntryOptions { AbsoluteExpirationRelativeToNow = TimeSpan.FromHours(1) });
}`
    },
    {
      id: 'performance',
      title: 'Span<T> & Memory<T>',
      desc: 'Zero-Allocation Performance',
      usage: 'Parsing, High-throughput data',
      code: `// 1. String Slicing without Allocation
string fullDate = "2024-04-23";
ReadOnlySpan<char> dateSpan = fullDate.AsSpan();

// No new string created here!
var year = int.Parse(dateSpan.Slice(0, 4));
var month = int.Parse(dateSpan.Slice(5, 2));

// 2. Working with Buffers
public void Process(Span<byte> buffer) {
    for (int i = 0; i < buffer.Length; i++) {
        buffer[i] = (byte)(buffer[i] ^ 0xFF);
    }
}

// 3. MemoryPool (Preventing Garbage Collection)
using var owner = MemoryPool<byte>.Shared.Rent(4096);
Memory<byte> memory = owner.Memory;`
    }
  ];

  return (
    <div className="csharp-advanced">
      <div className="header-section">
        <h1 className="title">.NET Core 8 Deep Dive</h1>
        <p className="description">
          A definitive guide to high-performance enterprise development. 
          Each section includes production-ready code patterns and architectural best practices.
        </p>
      </div>

      {/* DI Lifetime Interactive Visualization */}
      <div className="demo-section" style={{ borderLeft: '4px solid var(--primary)', background: 'rgba(99, 102, 241, 0.05)' }}>
        <div className="demo-title">
          <HelpCircle className="text-primary" />
          Understanding DI Lifetimes
        </div>
        <div className="grid-2">
          <div className="card">
            <h4 style={{ color: 'var(--primary)', marginBottom: '10px' }}>Scenario: Request 1 (User A)</h4>
            <ul style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', listStyle: 'none' }}>
              <li>🔹 **Transient**: Service A1, Service A2 (Different)</li>
              <li>🔹 **Scoped**: Service S1, Service S1 (Same)</li>
              <li>🔹 **Singleton**: Instance G1 (Same for all)</li>
            </ul>
          </div>
          <div className="card">
            <h4 style={{ color: 'var(--accent)', marginBottom: '10px' }}>Scenario: Request 2 (User B)</h4>
            <ul style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', listStyle: 'none' }}>
              <li>🔹 **Transient**: Service B1, Service B2 (Different)</li>
              <li>🔹 **Scoped**: Service S2, Service S2 (Different from A)</li>
              <li>🔹 **Singleton**: Instance G1 (STILL the same!)</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <div className="demo-title">
          <Activity className="text-primary" />
          Topics Explorer
        </div>
        <div className="product-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}>
          {topics.map((t, idx) => (
            <div 
              key={t.id} 
              className={`product-card \${currentStep === idx ? 'active-card' : ''}`}
              style={{ 
                cursor: 'pointer', 
                borderColor: currentStep === idx ? 'var(--primary)' : '',
                background: currentStep === idx ? 'rgba(99, 102, 241, 0.1)' : ''
              }}
              onClick={() => setCurrentStep(idx)}
            >
              <h3 style={{ fontSize: '1rem', marginBottom: '8px', color: currentStep === idx ? 'var(--primary)' : 'inherit' }}>{t.title}</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{t.desc}</p>
              <div className="badge" style={{ marginTop: '15px' }}>{t.usage.split(',')[0]}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="code-space">
        <div className="demo-title">
          <Terminal className="text-primary" />
          Production-Ready Implementation
        </div>
        
        <div className="step-code-section" style={{ height: '700px' }}>
          <div className="step-header">
            <div className="step-info">
              <span className="file-name">{topics[currentStep].title}</span>
              <span className="step-desc">{topics[currentStep].usage}</span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                className="action-btn edit-btn" 
                disabled={currentStep === 0}
                onClick={() => setCurrentStep(prev => prev - 1)}
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                className="action-btn edit-btn"
                disabled={currentStep === topics.length - 1}
                onClick={() => setCurrentStep(prev => prev + 1)}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          <div className="scrollable-code">
            <pre className="code-block" style={{ fontSize: '0.9rem' }}>
              <code>{topics[currentStep].code}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSharpAdvancedDemo;
