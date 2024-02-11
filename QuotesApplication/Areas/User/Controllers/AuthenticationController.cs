using Microsoft.AspNetCore.Mvc;
using QuotesApplication.Data;
using QuotesApplication.Areas.User.ViewModels;
using Microsoft.AspNetCore.Identity;
using QuotesApplication.Areas.User.Models;
using Microsoft.EntityFrameworkCore;

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
            newUser.PasswordHash = _passwordHasher.HashPassword(newUser, user.Password);

            
            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();
      
            return CreatedAtAction("GetUser", new { id = newUser.Id }, null); 
        }

        [HttpGet]
        public async Task<ActionResult<bool>> IsEmailUsed(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
            {
                return BadRequest("Email is required.");
            }

            var isUsed = await _context.Users.AnyAsync(u => u.Email == email);
            return Ok(isUsed);
        }
        [HttpGet]
        public async Task<ActionResult<bool>> isUsernameUsed(string username)
        {
            if(string.IsNullOrWhiteSpace(username))
            {
                return BadRequest("Username is required.");
            }

            var isUsed = await _context.Users.AnyAsync(u => u.Username == username);
            return Ok(isUsed);
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
