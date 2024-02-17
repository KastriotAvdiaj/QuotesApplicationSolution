using QuotesApplication.Areas.User.Models;

namespace QuotesApplication.Areas.User.Services
{
    public interface IAuthenticationService
    {
        string GenerateJwtToken(ApplicationUser user);

        Task<ApplicationUser> AuthenticateUser(string username, string password);

        (bool IsSignedIn, SimpleUserModel User) IsUserSignedIn();
    }
}
