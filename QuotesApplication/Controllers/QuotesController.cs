﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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


        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var quote = _db.Quotes.Find(id);

            if (quote != null)
            {
                _db.Remove(quote);
                _db.SaveChanges();

                return Ok("Quote with the ID[" + quote.Id + "] was deleted successfully!");
            }
            else
            {
                return NotFound();
            }
        }


        [HttpGet("{authorName}")]
        public IActionResult GetQuotesByWriter(string authorName)
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
