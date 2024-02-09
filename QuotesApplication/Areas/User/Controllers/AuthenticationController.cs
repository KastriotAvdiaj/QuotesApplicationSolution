﻿using Microsoft.AspNetCore.Mvc;
using QuotesApplication.Data;
using QuotesApplication.Areas.User.ViewModels;
using Microsoft.AspNetCore.Identity;
using QuotesApplication.Areas.User.Models;

namespace QuotesApplication.Areas.User.Controllers
{

    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthenticationController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly PasswordHasher<ApplicationUser> _passwordHasher;

        public AuthenticationController(ApplicationDbContext context)
        {
            _context = context;
            _passwordHasher = new PasswordHasher<ApplicationUser>();
        }

        [HttpPost]
        public async Task<IActionResult> SignUp(UserViewModel user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Check if the email already exists
            var existingUser = _context.Users.FirstOrDefault(u => u.Email == user.Email);
            if (existingUser != null)
            {
                return BadRequest("Email already in use.");
            }


            var newUser = new ApplicationUser
            {
                Id = Guid.NewGuid().ToString(),
                Username = user.Username,
                Email = user.Email,
                NormalizedUsername = user.Username.ToUpper(),
                NormalizedEmail = user.Email.ToUpper(),
            };

            // Hash the password
            newUser.PasswordHash = _passwordHasher.HashPassword(newUser, user.Password);

            // Add the new user to the database
            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            // Return a successful response (e.g., CreatedAtAction to follow RESTful best practices)
            return CreatedAtAction("GetUser", new { id = newUser.Id }, newUser); // Adjust "GetUser" as per your actual GET method
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ApplicationUser>> GetUser(string id)
        {
            if (id == null)
            {
                return BadRequest("Invalid user ID.");
            }

            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound($"User with ID {id} not found.");
            }

            return Ok(user);
        }
    }
}
