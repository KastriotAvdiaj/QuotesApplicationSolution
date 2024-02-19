using System.ComponentModel.DataAnnotations;

namespace QuotesApplication.ViewModels
{
    public class BooksViewModel
    {

        [Required]
        public string Title { get; set; }

        public string? Description { get; set; }

        [Required]
        public string Author { get; set; }


        [Required]
        public IFormFile ImageFile { get; set; }

    }
}
