using System.ComponentModel.DataAnnotations.Schema;

namespace QuotesApplication.Models
{
    public class Books
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }

        public string Author { get; set; }

        [NotMapped]
        public string? ImageBase64 { get; set; }

        public byte[] ImageBytes { get; set; }
    }
}
