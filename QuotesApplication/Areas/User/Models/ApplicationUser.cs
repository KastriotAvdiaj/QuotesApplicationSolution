using System.ComponentModel.DataAnnotations;

namespace QuotesApplication.Areas.User.Models
{
    public class ApplicationUser
    {

        public string Id { get; set; }

        [Required]
        [StringLength(25, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 3)]
        public string Username { get; set; }

        [Required]
        public string NormalizedUsername { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        public bool EmailVerified { get; set; } = false;

        [Required]
        public string NormalizedEmail { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 6)]
        public string PasswordHash { get; set; }

        public Roles Role { get; set; }


    }
}
