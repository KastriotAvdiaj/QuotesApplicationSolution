using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using QuotesApplication.Areas.User.Models;
using QuotesApplication.Areas.User.ViewModels;
using QuotesApplication.Data;

namespace QuotesApplication.Areas.User.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ApplicationUsersController : ControllerBase
    {
        private readonly ILogger<ApplicationUsersController> _logger;
        private readonly ApplicationDbContext _context;
        private readonly PasswordHasher<ApplicationUser> _passwordHasher;

        public ApplicationUsersController(ApplicationDbContext context, ILogger<ApplicationUsersController> logger)
        {
            _context = context;
            _passwordHasher = new PasswordHasher<ApplicationUser>();
            _logger = logger;
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
        public async Task<IActionResult> PutApplicationUser(string id,[FromBody] UpdateUserViewModel updatedUserData)
        {
            if (id == null)
            {
                return BadRequest();
            }

            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return BadRequest();
            }

            if(updatedUserData.Role == null)
            {
                return BadRequest("Specified role does not exist.");

            }
 
                var role = await _context.Roles.SingleOrDefaultAsync(r => r.Role == updatedUserData.Role);
                if (role == null)
                {
                    var roleName = updatedUserData.Role;
                    _logger.LogWarning("Role {Role} not found.", roleName);
                    return BadRequest("Specified role does not exist.");
                }
            

            user.Username = updatedUserData.Username;
            user.NormalizedUsername = updatedUserData.Username.ToUpper();
            user.Email = updatedUserData.Email;
            user.NormalizedEmail = updatedUserData.Email.ToUpper();
            user.Role = role;
            user.RoleName = updatedUserData.Role;

            _context.Entry(user).State = EntityState.Modified;


            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ApplicationUserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> ChangeUsersPassword ( string id, [FromBody] string password)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return BadRequest("User not found");
            }
            try
            {
                var hasher = new PasswordHasher<ApplicationUser>();
                user.PasswordHash = hasher.HashPassword(user, password);
                await _context.SaveChangesAsync();
            }
            catch(DbUpdateException)
            {
                return BadRequest("Something went wrong");
            }
            
            return Ok();
        }

        private bool ApplicationUserExists(string id)
        {
            return _context.Users.Any(e => e.Id == id);
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
        [HttpDelete]
        public async Task<IActionResult> DeleteApplicationUsers([FromBody] string[] ids)
        {
            if (ids == null || ids.Length == 0)
            {
                return BadRequest("IDs cannot be null or empty");
            }

            var usersToDelete = await _context.Users.Where(u => ids.Contains(u.Id)).ToListAsync();

            if (usersToDelete == null || usersToDelete.Count == 0)
            {
                return NotFound("No users found with the provided IDs");
            }

            _context.Users.RemoveRange(usersToDelete);
            await _context.SaveChangesAsync();

            return Ok("Users deleted successfully");
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<object>> GetApplicationUseRole(string username)
        {
            if (string.IsNullOrEmpty(username))
            {
                return BadRequest("Username cannot be null or empty");
            }

            var applicationUser = await _context.Users.FirstOrDefaultAsync(u => u.NormalizedUsername == username.ToUpper());
            

            if (applicationUser == null)
            {
                return NotFound("User not found");
            }

            return new { RoleName = applicationUser.RoleName };
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
