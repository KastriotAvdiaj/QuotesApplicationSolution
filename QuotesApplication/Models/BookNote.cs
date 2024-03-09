using System.ComponentModel.DataAnnotations.Schema;

namespace QuotesApplication.Models
{
    public class BookNote
    {
        public int Id { get; set; }

        public int? Page { get; set; }

        public string Note { get; set; }

        public string? Title { get; set; }

        public string Color { get; set; }

        public int BookId { get; set; }

        [ForeignKey("BookId")]
        public virtual Books Book { get; set; }
    }
}
