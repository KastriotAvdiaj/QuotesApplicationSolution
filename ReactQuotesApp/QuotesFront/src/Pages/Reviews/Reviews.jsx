import React from "react";
import { Review } from "./Review";

export const Reviews = ({ reviews, addReview, loading, error }) => {
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {reviews.length > 0 ? (
        <ul className="review-ul">
          {reviews.map((review) => (
            <li key={review.id}>
              <Review key={review.id} review={review} />
            </li>
          ))}
          <li className="add-review-button-container" >
            <button
              className="newNoteButton review"
              onClick={addReview}
             
            >
              Add Review
            </button>
          </li>
        </ul>
      ) : (
        <div className="no-reviews-and-button">
          <p className="no-reviews">
            This book currently has no reviews, be the first
          </p>
          <button className="newNoteButton review" onClick={addReview}>
            Add Review
          </button>
        </div>
      )}
    </div>
  );
};
