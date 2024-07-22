import React from "react";
import "./Review.css";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";

export const Review = ({ review }) => {
  return (
    <ul className="review-list">
      <li key={review.book.Id}>
        <p className="user-that-commented">
          {review.user.username} commented :{" "}
        </p>
        <p className="user-comment"> {review.comment}</p>
        <div className="review-rating">
          <div className="review-rating-stars">
            <Typography component="legend">Rating</Typography>
            <Rating
              value={review.rating}
              readOnly
              sx={{
                "& .MuiRating-iconFilled": {
                  color: "#f5c013", // Customize this color for filled stars
                },
                "& .MuiRating-iconHover": {
                  color: "#ff3d47", // Customize this color for hovered stars
                },
                "& .MuiRating-iconEmpty": {
                  color: "#e4e5e9", // Customize this color for empty stars
                },
                fontSize: "2rem",
              }}
            />
          </div>
          <span>({review.rating})</span>
        </div>
        <Divider
          sx={{
            backgroundColor: "#D8D8D8",
          }}
        />
      </li>
    </ul>
  );
};
