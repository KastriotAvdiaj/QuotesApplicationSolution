using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuotesApplication.Areas.User.Models;
using QuotesApplication.Data;
using QuotesApplication.Models;
using QuotesApplication.ViewModels;

namespace QuotesApplication.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ReviewsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Reviews
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Reviews>>> GetReviews()
        {
          if (_context.Reviews == null)
          {
              return NotFound();
          }
            return await _context.Reviews.ToListAsync();
        }

 
        [HttpGet("{id}")]
        public async Task<ActionResult<Reviews>> GetReviewById(int id)
        {
            var review = await _context.Reviews.FindAsync(id);

            if (review == null)
            {
                return NotFound();
            }

            return review;
        }

        // PUT: api/Reviews/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReviews(int id, Reviews reviews)
        {
            if (id != reviews.Id)
            {
                return BadRequest();
            }

            _context.Entry(reviews).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReviewsExists(id))
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

        // POST: api/Reviews
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Reviews>> PostReviews(ReviewDTO reviews)
        {
          if (_context.Reviews == null)
          {
              return Problem("Entity set 'ApplicationDbContext.Reviews'  is null.");
          }

            ApplicationUser user = await _context.Users.FindAsync(reviews.UserId);
            Books book = await _context.Books.FindAsync(reviews.BookId);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            if (book == null)
            {
                return NotFound("Book not found.");
            }

            Reviews review = new Reviews
            {
                Comment = reviews.Comment,
                Rating = reviews.Rating,
                UserId = reviews.UserId,
                BookId = reviews.BookId,
                User = user,
                Books = book,   
                CreatedDate = DateTime.Now
            };

             _context.Reviews.Add(review);
            await _context.SaveChangesAsync();

            return Ok();
        }

        // DELETE: api/Reviews/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReviews(int id)
        {
            if (_context.Reviews == null)
            {
                return NotFound();
            }
            var reviews = await _context.Reviews.FindAsync(id);
            if (reviews == null)
            {
                return NotFound();
            }

            _context.Reviews.Remove(reviews);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ReviewsExists(int id)
        {
            return (_context.Reviews?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
