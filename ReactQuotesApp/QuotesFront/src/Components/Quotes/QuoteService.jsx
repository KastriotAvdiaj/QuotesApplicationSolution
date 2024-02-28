const baseUrl = "https://localhost:7099/api/Quotes";

const createQuote = async (newQuote) => {
  const response = await fetch(`${baseUrl}/Add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newQuote),
  });
  if (!response.ok) throw new Error("Failed to add the quote.");
  return response.json();
};

const deleteQuotes = async (quoteIds) => {
  const response = await fetch(`${baseUrl}/Delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quoteIds),
  });
  if (!response.ok) throw new Error("Failed to delete the selected quotes.");
  return true;
};


export { createQuote, deleteQuotes };
