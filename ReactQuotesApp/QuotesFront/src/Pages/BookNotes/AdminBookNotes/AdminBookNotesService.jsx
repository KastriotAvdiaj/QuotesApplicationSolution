export const getBooksWithBookNotes = async () => {
  try {
    const response = await fetch(
      "https://localhost:7099/api/Books/GetBookIdsWithNotes"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const changeNotesBook = async (bookTitle, bookNoteId) => {
  try {
    console.log(bookTitle);
    const response = await fetch(
      `https://localhost:7099/api/BookNotes/ChangeNotesBook/${bookNoteId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookTitle),
        // body: bookTitle,
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data", response);
    }
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
