export const addReview = async (review) => {
  try {
    const response = await fetch(
      "https://localhost:7099/api/Reviews/PostReviews",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
      }
    );
    console.log(review);
    if (response.ok) {
      return true;
    } else {
      throw new Error("Failed to create review");
    }
  } catch (e) {
    console.log(e);
  }
};

export const getReviews = async () => {
  try {
    const response = await fetch(
      "https://localhost:7099/api/Reviews/GetReviews",
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to retrieve reviews");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};


export const getReviewsById = async (bookId) => {
  try {
    const response = await fetch(
      `https://localhost:7099/api/Reviews/GetReviewsByBookId/ByBook/${bookId}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to retrieve reviews");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};
