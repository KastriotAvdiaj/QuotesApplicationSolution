using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuotesApplication.Areas.User.Models;
using QuotesApplication.Areas.User.ViewModels;
using QuotesApplication.Data;

namespace QuotesApplication.Areas.User.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ApplicationUsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly PasswordHasher<ApplicationUser> _passwordHasher;

        public ApplicationUsersController(ApplicationDbContext context)
        {
            _context = context;
            _passwordHasher = new PasswordHasher<ApplicationUser>();
        }

        // GET: api/ApplicationUsers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ApplicationUser>>> GetUsers()
        {
          if (_context.Users == null)
          {
              return NotFound();
          }
            return await _context.Users.ToListAsync();
        }

        // GET: api/ApplicationUsers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ApplicationUser>> GetApplicationUser(string id)
        {
          if (_context.Users == null)
          {
              return NotFound();
          }
            var applicationUser = await _context.Users.FindAsync(id);

            if (applicationUser == null)
            {
                return NotFound();
            }

            return applicationUser;
        }

        // PUT: api/ApplicationUsers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutApplicationUser(string id, ApplicationUser applicationUser)
        {
            if (id != applicationUser.Id)
            {
                return BadRequest();
            }

            var hasher = new PasswordHasher<ApplicationUser>();
            applicationUser.PasswordHash = hasher.HashPassword(applicationUser, applicationUser.PasswordHash);

            _context.Entry(applicationUser).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ApplicationUserExists(id, applicationUser.Username, applicationUser.Email))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ApplicationUsers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ApplicationUser>> PostApplicationUser(NewUserViewModel applicationUser)
        {
            if (_context.Users == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Users'  is null.");
            }

            const int roleId = 2;

            var role = _context.Roles.FirstOrDefault(r => r.Id == roleId);

            if (role == null)
            {
                return BadRequest("Role not found");
            }

            if (ApplicationUserExists("", applicationUser.Username, applicationUser.Email))
            {
                return Conflict();
            }

            var newUser = new ApplicationUser
            {
                Id = Guid.NewGuid().ToString(),
                Username = applicationUser.Username,
                NormalizedUsername = applicationUser.Username.ToUpper(),
                Email = applicationUser.Email,
                NormalizedEmail = applicationUser.Email.ToUpper(),
                Role = role,
                RoleName = role.Role,

            };
            newUser.PasswordHash = _passwordHasher.HashPassword(newUser, applicationUser.Password);

            _context.Users.Add(newUser);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ApplicationUserExists(newUser.Id, applicationUser.Username,applicationUser.Email))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return Ok(newUser);
            /*return CreatedAtAction("GetApplicationUser", new { id = newUser.Id }, newUser);*/
        }

        // DELETE: api/ApplicationUsers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteApplicationUser(string id)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            var applicationUser = await _context.Users.FindAsync(id);
            if (applicationUser == null)
            {
                return NotFound();
            }

            _context.Users.Remove(applicationUser);
            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool ApplicationUserExists(string id, string username, string email)
        {
            if (_context.Users == null)
            {
                return false;
            }

            return _context.Users.Any(e => e.Id == id || e.Username == username || e.Email == email);
        }
    }
}
