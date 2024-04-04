export const postBookNote = async (bookId, BookNote) => {
  try {
    const response = await fetch(
      `https://localhost:7099/api/BookNotes/PostBookNote/${bookId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(BookNote),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (e) {
    console.error("Failed to post book note:", e.message);
    throw e;
  }
};

export const getBookNotes = async () => {
  try {
    const response = await fetch(
      "https://localhost:7099/api/BookNotes/GetBookNotes"
    );

    return response.json();
  } catch (e) {
    console.error("Failed to fetch book notes", e.message);
    throw e;
  }
};

export const getBookNotesById = async (bookId) => {
  try {
    const response = await fetch(
      `https://localhost:7099/api/BookNotes/GetBookNotesByBookId/${bookId}`,
      {}
    );

    return response.json();
  } catch (e) {
    console.error("Failed to fetch book notes", e.message);
    throw e;
  }
};

export const getBookNotesByTitle = async (bookTitle) => {
  try {
    const response = await fetch(
      `https://localhost:7099/api/BookNotes/GetBookNotesByBookTitle/${bookTitle}`,
      {}
    );

    return response.json();
  } catch (e) {
    console.error("Failed to fetch book notes", e.message);
    throw e;
  }
};

export const deleteBookNoteById = async (bookId) => {
  try {
    const response = await fetch(
      `https://localhost:7099/api/BookNotes/DeleteBookNote/${bookId}`,
      { method: "DELETE" }
    );

    if (response.ok) {
      return true;
    } else {
      throw new Error(`Failed to delete book note: ${response.statusText}`);
    }
  } catch (e) {
    console.error("Failed to delete book notes", e.message);
    throw e;
  }
};
