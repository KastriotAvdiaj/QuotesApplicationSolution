const baseUrl = "https://localhost:7099/api/Books";

// Function to update a book
export const updateBook = async (
  bookId,
  bookData,
  imageFile
  // handleSuccessfulUpdate
) => {


  const formData = new FormData();
  formData.append("title", bookData.title);
  formData.append("author", bookData.author);
  formData.append("description", bookData.description);
  if (imageFile) {
    formData.append("imageFile", imageFile);
  }

  const response = await fetch(`${baseUrl}/PutBooks/${bookId}`, {
    method: "PUT",
    body: (bookData.id, formData),
  });

  if (!response.ok) {
    throw new Error("Failed to update the book");
  }
  // handleSuccessfulUpdate();
  return response.json();
};
