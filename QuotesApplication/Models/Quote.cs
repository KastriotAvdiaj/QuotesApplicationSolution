using System.ComponentModel.DataAnnotations;

namespace QuotesApplication.Models
{
    public class Quote
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string AuthorName { get; set; }

        [Required]
        public string Description { get; set; }
    }
}
