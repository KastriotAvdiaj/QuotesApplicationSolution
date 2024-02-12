using System.ComponentModel.DataAnnotations;

namespace QuotesApplication.Areas.User.ViewModels
{
    public class LoginDto
    {
        [Required]
        public string Email { get; set; }


        [Required]
        public string Password { get; set; }
    }
}
