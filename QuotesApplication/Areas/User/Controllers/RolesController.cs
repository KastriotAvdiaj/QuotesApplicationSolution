using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuotesApplication.Areas.User.Models;
using QuotesApplication.Areas.User.ViewModels;
using QuotesApplication.Data;

namespace QuotesApplication.Areas.User.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RolesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Roles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RoleWithUserCount>>> GetRolesWithUserCount()
        {
            var rolesWithUserCount = await _context.Roles
        .Select(role => new RoleWithUserCount
        {
            RoleId = role.Id,
            RoleName = role.Role,
            Access = role.Access,
            UserCount = _context.Users.Count(user => user.Role.Id == role.Id)
        })
        .ToListAsync();

            return rolesWithUserCount;
        }

        // GET: api/Roles/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Roles>> GetRoles(int id)
        {
            if (_context.Roles == null)
            {
                return NotFound();
            }
            var roles = await _context.Roles.FindAsync(id);

            if (roles == null)
            {
                return NotFound();
            }

            return roles;
        }

        [HttpGet("/singleRole/{roleName}")]
        public async Task<ActionResult<Roles>> GetRoleByName(string roleName)
        {
            var role = await _context.Roles.FirstOrDefaultAsync(r => r.Role == roleName);

            if (role == null)
            {
                return NotFound();
            }

            return role;
        }

        // PUT: api/Roles/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRoles(int id, Roles roles)
        {
            if (id != roles.Id)
            {
                return BadRequest();
            }

            _context.Entry(roles).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RolesExists(id))
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

        // POST: api/Roles
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Roles>> PostRoles([FromBody] Roles roles)
        {
          if (_context.Roles == null)
          {
              return Problem("Entity set 'ApplicationDbContext.Roles'  is null.");
          }
            if (ModelState.IsValid)
            {
            
                if (_context.Roles.Any(r => r.Role == roles.Role))
                {
                    ModelState.AddModelError("Name", "Role with the same name already exists.");
                    return BadRequest(ModelState);
                }
                _context.Roles.Add(roles);
                await _context.SaveChangesAsync();

                return Ok();
            }
            return BadRequest(ModelState);
        }

        [HttpDelete("{roleName}")]
        public async Task<IActionResult> DeleteRoles(string roleName)
        {
            var role = await _context.Roles.SingleOrDefaultAsync(r => r.Role == roleName);
            if (role == null)
            {
                return NotFound();
            }
            if (role.Role == "Admin" || role.Role == "User")
            {
                return BadRequest("Cannot delete built-in roles.");
            }

            var usersWithRole = _context.Users.Where(u => u.RoleName == roleName);

            var userRole = await _context.Roles.SingleOrDefaultAsync(r => r.Role == "User");
            if (userRole == null)
            {
                return BadRequest("Default 'User' role not found.");
            }
            foreach (var user in usersWithRole)
            {
                user.Role = userRole;
                user.RoleName = userRole.Role;
            }

            _context.Roles.Remove(role);

            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool RolesExists(int id)
        {
            return (_context.Roles?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
