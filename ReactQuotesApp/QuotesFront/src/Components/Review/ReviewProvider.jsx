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
