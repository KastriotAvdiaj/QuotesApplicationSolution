
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using QuotesApplication.Data;
using QuotesApplication.Models;
using QuotesApplication.ViewModels;
using System.IO;
using static System.Reflection.Metadata.BlobBuilder;

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
                    Author = book.Author,
                    ImageBase64 = book.ImageBytes != null ? Convert.ToBase64String(book.ImageBytes) : null,
                };

                bookDTOs.Add(bookDTO);
            }

            return bookDTOs;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookWithNotesDTO>>> GetBookIdsWithNotes()
        {
            var booksWithNotes = await _context.BookNotes
                .Include(n => n.Book)
                .ToListAsync();

            if (booksWithNotes == null || !booksWithNotes.Any())
            {
                return NotFound();
            }

            var bookWithNotesDTOs = booksWithNotes
                .GroupBy(n => n.BookId)
                .Select(group => new BookWithNotesDTO
                {
                    BookId = group.Key,
                    Title = group.First().Book.Title,
                    Author = group.First().Book.Author,
                    BookNotes = group.Select(note => new BookNoteViewModel
                    {
                        Note = note.Note,
                        Title = note.Title,
                        Color = note.Color,
                        Page = note.Page
                    }).ToList()
                }).ToList();

            return Ok(bookWithNotesDTOs);
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
        public async Task<IActionResult> PutBooks([FromBody] BookEditViewModel books)
        {
            if (_context.Books == null)
            {
                return BadRequest("Books context is null.");
            }

            var existingBook = _context.Books.Find(books.Id);
            if (existingBook == null)
            {
                return NotFound($"Book with ID {books.Id} not found.");
            }
            existingBook.Title = books.Title;
            existingBook.Author = books.Author;
            existingBook.Description = books.Description;


            if (!string.IsNullOrWhiteSpace(books.imageBase64))
            {
                existingBook.ImageBytes = ConvertBase64ToBytes(books.imageBase64);
            }
            else
            {
                existingBook.ImageBytes = existingBook.ImageBytes;
            }

            _context.Entry(existingBook).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BooksExists(books.Id))
                {
                    return NotFound($"Book with ID {books.Id} does not exist.");
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

        public static byte[] ConvertBase64ToBytes(string base64String)
        {
            // Check if the base64 string contains a data URL scheme and strip it out.
            int indexOfComma = base64String.IndexOf(',');
            if (indexOfComma != -1)
            {
                // Assume the data URL scheme is present and strip it out.
                base64String = base64String.Substring(indexOfComma + 1);
            }

            try
            {
                return Convert.FromBase64String(base64String);
            }
            catch (FormatException e)
            {
                Console.WriteLine($"Invalid base64 string format: {e.Message}");
                throw new Exception(e.Message);
            }
        }
    }
    }
