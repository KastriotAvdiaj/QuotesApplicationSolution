using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuotesApplication.Data;
using QuotesApplication.Models;
using QuotesApplication.ViewModels;

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
        public async Task<IActionResult> PutBooks(int id, Books books)
        {
            if (id != books.Id)
            {
                return BadRequest();
            }

            _context.Entry(books).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BooksExists(id))
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
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBooks(int id)
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

            _context.Books.Remove(books);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BooksExists(int id)
        {
            return (_context.Books?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
