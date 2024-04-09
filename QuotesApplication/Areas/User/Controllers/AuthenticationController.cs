using Microsoft.AspNetCore.Mvc;
using QuotesApplication.Data;
using QuotesApplication.Areas.User.ViewModels;
using Microsoft.AspNetCore.Identity;
using QuotesApplication.Areas.User.Models;
using Microsoft.EntityFrameworkCore;
using QuotesApplication.Areas.User.Services;

namespace QuotesApplication.Areas.User.Controllers
{

    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthenticationController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly PasswordHasher<ApplicationUser> _passwordHasher;
        private readonly IAuthenticationService _authenticationService;

        public AuthenticationController(ApplicationDbContext context, IAuthenticationService authenticationService)
        {
            _authenticationService = authenticationService;
            _context = context;
            _passwordHasher = new PasswordHasher<ApplicationUser>();
        }


        /*.
        CHECKING IF THE USER IS SIGNEDIN ENDPOINT
        .*/
        [HttpGet]
        public ActionResult IsUserSignedIn()
        {
            var (IsSignedIn, User) = _authenticationService.IsUserSignedIn();

            if (!IsSignedIn)
            {
                return Ok(new { IsSignedIn = false });
            }

            return Ok(new
            {
                IsSignedIn = true,
                User = User
            });
        }

        /*.
        SIGNUP API ENDPOINT
        .*/
        [HttpPost]
        public async Task<IActionResult> SignUp(UserViewModel user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            const int roleId = 2;

            var role = _context.Roles.FirstOrDefault(r => r.Id == roleId);

            if (role == null)
            {
                return BadRequest("Role not found");
            }

            var newUser = new ApplicationUser
            {
                Id = Guid.NewGuid().ToString(),
                Username = user.Username,
                Email = user.Email,
                NormalizedUsername = user.Username.ToUpper(),
                NormalizedEmail = user.Email.ToUpper(),
                Role = role,
            };
            newUser.PasswordHash = _passwordHasher.HashPassword(newUser, user.Password);

            try
            {
                _context.Users.Add(newUser);
                await _context.SaveChangesAsync();

                var loginData = new LoginDto
                {
                    Email = user.Email,
                    Password = user.Password
                };

                await SignIn(loginData);

                return Ok(newUser);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while saving the user: {ex.Message}");
            }
        }

        /*.
        SIGNIN API ENDPOINT
        .*/
        [HttpPost]
        public async Task<IActionResult> SignIn([FromBody] LoginDto loginData)
        {
            var user = await _authenticationService.AuthenticateUser(loginData.Email, loginData.Password);
            if (user != null)
            {
                var token = _authenticationService.GenerateJwtToken(user);
                return Ok(new
                {
                    Token = token,
                    user.Username,
                    user.Email
                });

            }

            return Unauthorized("Invalid email or password.");
        }


        /*.
        CHECKING IF EMAIL IS USED
        .*/
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

        /*.
        CHECKING IF USERNAME IS USED
        .*/
        [HttpGet]
        public async Task<ActionResult<bool>> isUsernameUsed(string username)
        {
            if (string.IsNullOrWhiteSpace(username))
            {
                return BadRequest("Username is required.");
            }

            var isUsed = await _context.Users.AnyAsync(u => u.Username == username);
            return Ok(isUsed);
        }

        /*.
        RETRIEVING A USER BASED ON THEIR ID
        .*/
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

        /*.
        PASSWORD VALIDTATING METHOD
        .*/
        private bool ValidatePassword(string password, out List<string> errors)
        {
            errors = new List<string>();
            if (password.Length < 8)
            {
                errors.Add("Password must be at least 8 characters long.");
            }
            if (!password.Any(char.IsUpper))
            {
                errors.Add("Password must contain at least one uppercase letter.");
            }
            if (!password.Any(char.IsLower))
            {
                errors.Add("Password must contain at least one lowercase letter.");
            }
            if (!password.Any(char.IsDigit))
            {
                errors.Add("Password must contain at least one digit.");
            }
            if (!password.Any(ch => "!@#$%^&*()".Contains(ch)))
            {
                errors.Add("Password must contain at least one special character (!@#$%^&*()).");
            }

            return errors.Count == 0;
        }

        /*.
        PASSWORD VALIDTATING API ENDPOINT USING THE PASSWORD VALIDATION METHOD
        .*/
        [HttpPost]
        public IActionResult ValidatePassword([FromBody] string password)
        {
            if (ValidatePassword(password, out List<string> errors))
            {
                return Ok(new { isValid = true });
            }
            else
            {
                return Ok(new { isValid = false, errors = errors });
            }
        }

    }
}
