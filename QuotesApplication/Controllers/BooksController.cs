
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuotesApplication.Data;
using QuotesApplication.Models;
using QuotesApplication.ViewModels;
using System.IO;

namespace QuotesApplication.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BooksController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Books
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookDTO>>> GetBooks()
        {

            if (_context.Books == null)
            {
                return NotFound();
            }

            var books = await _context.Books.ToListAsync();
            var bookDTOs = new List<BookDTO>();

            foreach (var book in books)
            {
                var bookDTO = new BookDTO
                {
                    Id = book.Id,
                    Title = book.Title,
                    Description = book.Description,
                    Author=book.Author,
                ImageBase64 = book.ImageBytes != null ? Convert.ToBase64String(book.ImageBytes) : null,
                };

                bookDTOs.Add(bookDTO);
            }

            return bookDTOs;
        }

        // GET: api/Books/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Books>> GetBooks(int id)
        {
          if (_context.Books == null)
          {
              return NotFound();
          }
            var books = await _context.Books.FindAsync(id);

            if (books == null)
            {
                return NotFound();
            }

            return books;
        }

        // PUT: api/Books/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBooks(int id, [FromForm] BooksViewModel books)
        {
            if (_context.Books == null)
            {
                return BadRequest("Books context is null.");
            }

            var existingBook = _context.Books.Find(id);
            if (existingBook == null)
            {
                return NotFound($"Book with ID {id} not found.");
            }
            existingBook.Title = books.Title;
            existingBook.Author = books.Author;
            existingBook.Description = books.Description;

     
            if (books.ImageFile != null)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await books.ImageFile.CopyToAsync(memoryStream);
                    existingBook.ImageBytes = memoryStream.ToArray();
                    existingBook.ImageBase64 = Convert.ToBase64String(existingBook.ImageBytes);
                }
            }
          
            _context.Entry(existingBook).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BooksExists(id))
                {
                    return NotFound($"Book with ID {id} does not exist.");
                }
                else
                {
                    throw;
                }
            }

            return Ok(existingBook);
        }

        [HttpPost]
        public async Task<ActionResult<Books>> PostBooks([FromForm] BooksViewModel booksVM)
        {
            if (_context.Books == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Books'  is null.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var books = new Books
            {
                Title = booksVM.Title,
                Description = booksVM.Description,
                Author = booksVM.Author,
            };

            if (booksVM.ImageFile != null)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await booksVM.ImageFile.CopyToAsync(memoryStream);
                    books.ImageBytes = memoryStream.ToArray();
                    books.ImageBase64 = Convert.ToBase64String(books.ImageBytes);
                }
            }

            _context.Books.Add(books);
            await _context.SaveChangesAsync();

            return Ok(books);
        }

        // DELETE: api/Books/5
        [HttpDelete]
        public async Task<IActionResult> DeleteBooks([FromBody] int[] ids)
        {
            if (_context.Books == null)
            {
                return NotFound();
            }

            var booksToDelete = await _context.Books.Where(b => ids.Contains(b.Id)).ToListAsync();

            if (!booksToDelete.Any())
            {
                return NotFound("No books found with the provided IDs.");
            }
            
                _context.Books.RemoveRange(booksToDelete);
                _context.SaveChanges();

                return Ok($"Books with the IDs [{string.Join(", ", ids)}] were successfully deleted!");
           
        }

        private bool BooksExists(int id)
        {
            return (_context.Books?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
