const baseUrl = "https://localhost:7099/api/Books";

// Function to update a book
export const updateBook = async (bookData) => {
  const response = await fetch(`${baseUrl}/PutBooks/${bookData.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: bookData.id,
      title: bookData.title,
      author: bookData.author,
      description: bookData.description,
      imageBase64: bookData.imageBase64,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update the book");
  }
  return response.json();
};
