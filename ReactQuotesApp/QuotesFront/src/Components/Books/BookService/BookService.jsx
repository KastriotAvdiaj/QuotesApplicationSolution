const baseUrl = "https://localhost:7099/api/Books";

// Function to update a book
export const updateBook = async (
  bookId,
  bookData,
  imageFile,
  handleSuccessfulUpdate,
  updateTheBook
) => {
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };
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
  updateTheBook({
    id: bookData.id,
    author: bookData.author,
    description: bookData.description,
    image: convertToBase64(imageFile),
  });
  handleSuccessfulUpdate();
  return response.json();
};
