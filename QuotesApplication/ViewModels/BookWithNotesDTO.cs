using QuotesApplication.Models;

namespace QuotesApplication.ViewModels
{
    public class BookWithNotesDTO
    {
        public int BookId { get; set; }

        public string Title { get; set; }
        public string Author { get; set; }
        /*public string ImageBase64 { get; set; } */
        public List<BookNoteViewModel> BookNotes { get; set; }

        public BookWithNotesDTO()
        {
            BookNotes = new List<BookNoteViewModel>();
        }
    }
}
