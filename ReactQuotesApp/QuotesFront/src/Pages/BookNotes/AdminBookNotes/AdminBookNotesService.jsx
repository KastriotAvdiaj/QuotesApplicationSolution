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
