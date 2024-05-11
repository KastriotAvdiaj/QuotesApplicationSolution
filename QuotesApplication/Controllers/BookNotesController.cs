using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using NuGet.Versioning;
using QuotesApplication.Data;
using QuotesApplication.Models;
using QuotesApplication.ViewModels;

namespace QuotesApplication.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class BookNotesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BookNotesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/BookNotes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookNote>>> GetBookNotes()
        {
            if (_context.BookNotes == null)
            {
                return NotFound();
            }
            return await _context.BookNotes.ToListAsync();
        }

        // GET: api/BookNotes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<BookNote>>> GetBookNotesByBookId(int id)
        {
            if (_context.BookNotes == null)
            {
                return NotFound();
            }
            var bookNote = await _context.BookNotes.Where(p => p.BookId == id).ToListAsync();

            if (bookNote == null)
            {
                return NotFound();
            }

            return bookNote;
        }

        [HttpGet("{title}")]
        public async Task<ActionResult<IEnumerable<BookNote>>> GetBookNotesByBookTitle(string title)
        {
            if (_context.BookNotes == null)
            {
                return NotFound();
            }

            // Find the book by title
            var book = await _context.Books.FirstOrDefaultAsync(b => b.Title == title);
            if (book == null)
            {
                return NotFound("Book not found");
            }

            // Retrieve book notes based on book ID
            var bookNotes = await _context.BookNotes.Where(p => p.BookId == book.Id).ToListAsync();

            if (bookNotes == null || bookNotes.Count == 0)
            {
                return NotFound("No Book Notes Found For this Book");
            }

            return bookNotes;
        }

        // PUT: api/BookNotes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBookNote(int id, [FromBody] BookNoteViewModel bookNote)
        {
            var oldBookNote = await _context.BookNotes.FindAsync(id);

            if (id != oldBookNote.Id)
            {
                return BadRequest();
            }

            oldBookNote.Title = bookNote.Title;
            oldBookNote.Note = bookNote.Note;
            oldBookNote.Page = bookNote.Page;
            oldBookNote.Color = bookNote.Color;

            _context.Entry(oldBookNote).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookNoteExists(id))
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

        [HttpPut("{bookNoteId}")]
        public async Task<ActionResult<BookNote>> ChangeNotesBook( int bookNoteId, [FromBody] string bookTitle)
        {
            var bookNote = await _context.BookNotes.FindAsync(bookNoteId);
            if (bookNote == null)
            {
                return NotFound(bookNoteId);
            }

            var newBook = await _context.Books.FirstOrDefaultAsync(b => b.Title == bookTitle);
            if (newBook == null)
            {
                return NotFound(bookTitle);
            }

            bookNote.Book = newBook;
            bookNote.BookId = newBook.Id;

            _context.SaveChanges();

            return Ok(bookNote);
        }

        // POST: api/BookNotes
        [HttpPost("{bookId}")]
        public async Task<ActionResult<BookNote>> PostBookNote(int bookId, [FromBody] BookNoteViewModel bookNoteVM)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (_context.BookNotes == null)
          {
              return Problem("Entity set 'ApplicationDbContext.BookNotes'  is null.");
            }
            if (_context.Books == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Books'  is null.");
            }

            var book = await _context.Books.FindAsync(bookId);

            if (book == null)
            {
                return Problem("Book doesn't exist.");
            }

            var bookNote = new BookNote
            {
                Page = bookNoteVM.Page,
                Title = bookNoteVM.Title,
                Note = bookNoteVM.Note,
                BookId = bookId,
                Color = bookNoteVM.Color,
                /*Book = book,*/
            };
            if(bookNote.Title.IsNullOrEmpty())
            {
                    bookNote.Title = "Quote From the Book";
            }
            _context.BookNotes.Add(bookNote);
            await _context.SaveChangesAsync();

            return Ok(bookNote);
        }

        // DELETE: api/BookNotes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBookNote(int id)
        {
            if (_context.BookNotes == null)
            {
                return NotFound();
            }
            var bookNote = await _context.BookNotes.FindAsync(id);
            if (bookNote == null)
            {
                return NotFound();
            }

            _context.BookNotes.Remove(bookNote);
            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool BookNoteExists(int id)
        {
            return (_context.BookNotes?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
