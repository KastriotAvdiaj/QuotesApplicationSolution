﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using QuotesApplication.Areas.User.Models;
using QuotesApplication.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace QuotesApplication.Areas.User.Services
{
    public class AuthenticationService : IAuthenticationService
    {

        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _context;
        private readonly PasswordHasher<ApplicationUser> _passwordHasher;
        private readonly IHttpContextAccessor _httpContextAccessor;


        public AuthenticationService(IConfiguration configuration, ApplicationDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _configuration = configuration;
            _context = context;
            _passwordHasher = new PasswordHasher<ApplicationUser>();
            _httpContextAccessor = httpContextAccessor;
        }


        public (bool IsSignedIn, SimpleUserModel User)  IsUserSignedIn()
        {
            var user = _httpContextAccessor.HttpContext.User;
            if (user.Identity.IsAuthenticated)
            {
                var simpleUser = new SimpleUserModel
                {
                    UserId =  user.Claims.FirstOrDefault(c => c.Type == "UserId")?.Value,
                    Email = user.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value,
                };

                return (true, simpleUser);
            }

            return (false, null);
        }

        public string GenerateJwtToken(ApplicationUser user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
            new Claim(JwtRegisteredClaimNames.Sub, user.Username),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim("UserId", user.Id),
        };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(100), // Adjust expiration as necessary
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<ApplicationUser> AuthenticateUser(string email, string password)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
            {
                return null;
            }
            var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, password);

            if (result == PasswordVerificationResult.Failed)
            {
                return null;
            }

            return user;
        }
    }
}
