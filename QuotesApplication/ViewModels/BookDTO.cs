namespace QuotesApplication.ViewModels
{
    public class BookDTO
    {
        
            public int Id { get; set; }
            public string Title { get; set; }

            public string? Description { get; set; }
            public string Author { get; set; }
            public string ImageBase64 { get; set; }
  
    }
}
