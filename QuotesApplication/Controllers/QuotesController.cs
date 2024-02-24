using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuotesApplication.Data;
using QuotesApplication.Models;

namespace QuotesApplication.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class QuotesController : ControllerBase
    {
        private ApplicationDbContext _db {  get; set; }

        public QuotesController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public IEnumerable<Quote> GetQuotes()
        {
            return _db.Quotes.ToList();
        }

        [HttpPost]
        public IActionResult Add(Quote quote)
        {
            if (quote != null)
            {
                bool isDuplicate = _db.Quotes.Any(q => q.Description == quote.Description);

                if (isDuplicate)
                {
                    return Conflict("A quote with the same description already exists.");
                }

                _db.Quotes.Add(quote);
                _db.SaveChanges();
                return Ok(quote);
            }

            return NotFound();
        }

        [HttpPut("{id}")]
        public IActionResult Update(Quote newQuote)
        {
            var quote = _db.Quotes.Find(newQuote.Id);

            if(quote != null)
            { 
            quote.AuthorName = newQuote.AuthorName;
            quote.Description = newQuote.Description;

            _db.SaveChanges();

                return Ok(newQuote);
            }
            else
            {
                return NotFound();
            }
            
        }


        [HttpDelete]
        public async Task<IActionResult> Delete([FromBody] int[] ids)
        {
            var quotesToDelete = await _db.Quotes.Where(q => ids.Contains(q.Id)).ToListAsync();

            if (quotesToDelete.Any())
            {
                _db.Quotes.RemoveRange(quotesToDelete);
                _db.SaveChanges();

                return Ok($"Quotes with the IDs [{string.Join(", ", ids)}] were deleted successfully!");
            }
            else
            {
                return NotFound("No quotes found with the provided IDs.");
            }
        }


        [HttpGet("{authorName}")]
        public IActionResult GetQuotesByAuthor(string authorName)
        {
            var quotesByAuthor = _db.Quotes.Where(q => q.AuthorName == authorName).ToList();

            if (quotesByAuthor.Any())
            {
                return Ok(quotesByAuthor);
            }
                return NotFound("No quotes found from that author");
            
        }
    }
}
