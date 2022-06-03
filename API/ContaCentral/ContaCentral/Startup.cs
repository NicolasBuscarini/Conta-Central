using ContaCentral.Domain.Models;
using ContaCentral.Domain.Services.Implementations;
using ContaCentral.Domain.Services.Interfaces;
using ContaCentral.Infrastructure.Data.Context;
using ContaCentral.Infrastructure.Data.Repositories;
using ContaCentral.Infrastructure.Helper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ContaCentral
{
    public class Startup
    {
        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            string mySqlConnection = Configuration.GetConnectionString("DefaultConnection");

            services.AddCors(options =>
            {
                options.AddPolicy(name: MyAllowSpecificOrigins,
                                  builder =>
                                  {
                                      builder.WithOrigins("http://localhost:4200/");
                                  });
            });

            services.AddDbContextPool<MySQLContext>(options =>
                options.UseMySql(mySqlConnection, ServerVersion.AutoDetect(mySqlConnection)));

            // For Identity  
               services.AddIdentity<ApplicationUser, ApplicationRole>()
               .AddEntityFrameworkStores<MySQLContext>()
               .AddDefaultTokenProviders();

            services.AddControllers();

            // Adding Authentication  
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })

            // Adding Jwt Bearer  
            .AddJwtBearer(options =>
            {
                options.SaveToken = true;
                options.RequireHttpsMetadata = false;
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuer = true,
                    ValidIssuer = Configuration["JWT:ValidIssuer"],

                    ValidateAudience = true,
                    ValidAudience = Configuration["JWT:ValidAudience"],

                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JWT:Secret"])),

                    ValidateLifetime = true
                };
            });

            services.AddScoped(typeof(GenericRepository<,>));

            services.AddScoped<TransacaoRepository>();

            services.AddScoped<SaqueRepository>();
            services.AddScoped<ISaqueService, SaqueService>();
            services.AddScoped<DepositoRepository>();
            services.AddScoped<IDepositoService, DepositoService>();

            services.AddScoped<TransferenciaRepository>();
            services.AddScoped<ITransferenciaService, TransferenciaService>();

            services.AddScoped<CarteiraRepository>();
            services.AddScoped<ICarteiraService, CarteiraService>();

            services.AddScoped<UserRepository>();
            services.AddScoped<IAuthService, AuthService>();

            services.AddScoped<CobrancaRepository>();
            services.AddScoped<ICobrancaService, CobrancaService>();
            
            services.AddScoped<RelatorioRepository>();
            services.AddScoped<IRelatorioService, RelatorioService>();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "ContaCentral", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "ContaCentral v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(p => {
                p.AllowAnyMethod();
                p.AllowAnyHeader();
                p.AllowAnyOrigin();
            });

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
