using System.ComponentModel.DataAnnotations;

namespace QuotesApplication.Areas.User.ViewModels
{
    public class UpdateUserViewModel
    {
        [Required]
        [StringLength(25, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 3)]
        public string Username { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Role { get; set; }

    }
}
