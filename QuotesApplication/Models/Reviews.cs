using QuotesApplication.Areas.User.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuotesApplication.Models
{
    public class Reviews
    {
    public int Id { get; set; }

    public string Comment { get; set; }

    public float Rating { get; set; }

    public DateTime CreatedDate { get; set; } = DateTime.Now;


        [ForeignKey("User")]
        public string UserId { get; set; }

        [ForeignKey("Book")]
        public int BookId { get; set; }

    public virtual ApplicationUser User { get; set; }

    public virtual Books Books { get; set; }
    }
}
