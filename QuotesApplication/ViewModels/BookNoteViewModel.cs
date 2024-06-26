﻿namespace QuotesApplication.ViewModels
{
    public class BookNoteViewModel
    {
        public int Id { get; set; }
        public int? Page { get; set; }

        public string Note { get; set; }

        public string? Title { get; set; }

        public string Color { get; set; }
    }
}
