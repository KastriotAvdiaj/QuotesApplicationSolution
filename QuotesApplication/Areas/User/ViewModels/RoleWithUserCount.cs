namespace QuotesApplication.Areas.User.ViewModels
{
    public class RoleWithUserCount
    {
        public int RoleId { get; set; }
        public string RoleName { get; set; }

        public string Access {  get; set; }
        public int UserCount { get; set; }
    }
}
