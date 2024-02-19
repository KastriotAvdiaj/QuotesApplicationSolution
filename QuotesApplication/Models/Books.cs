namespace QuotesApplication.Models
{
    public class Books
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }

        public string Author { get; set; }

        public byte[] ImageBytes { get; set; }
    }
}
