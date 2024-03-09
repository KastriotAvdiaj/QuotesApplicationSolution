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
        public async Task<ActionResult<BookNote>> GetBookNote(int id)
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

            return bookNote;
        }

        // PUT: api/BookNotes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBookNote(int id, BookNote bookNote)
        {
            if (id != bookNote.Id)
            {
                return BadRequest();
            }

            _context.Entry(bookNote).State = EntityState.Modified;

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

            return NoContent();
        }

        private bool BookNoteExists(int id)
        {
            return (_context.BookNotes?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
