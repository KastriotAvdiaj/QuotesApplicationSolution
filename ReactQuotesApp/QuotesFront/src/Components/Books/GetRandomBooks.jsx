function GetRandomBooks(books) {
  let booksCopy = [...books];
  const count = 4;

  // Shuffle the array using Durstenfeld shuffle algorithm
  for (let i = booksCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [booksCopy[i], booksCopy[j]] = [booksCopy[j], booksCopy[i]]; // Swap elements
  }
  // Return the first `count` books from the shuffled array
  // or all books if there are less than `count` books
  return booksCopy.slice(0, Math.min(count, booksCopy.length));
}

export default GetRandomBooks;
