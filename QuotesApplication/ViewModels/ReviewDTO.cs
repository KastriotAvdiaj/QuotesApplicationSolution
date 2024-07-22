using QuotesApplication.Areas.User.Models;

namespace QuotesApplication.ViewModels
{
    public class ReviewDTO
    {
        public string UserId { get; set; }

        public ApplicationUser User { get; set; }

        public BookReviewDTO Book { get; set; }

        public int BookId { get; set; }

        public string Comment { get; set; }

        public double Rating { get; set; }
    }
}
