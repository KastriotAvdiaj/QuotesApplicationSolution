import React from "react";
import "./AddReview.css";
import { motion } from "framer-motion";
import { useAuth } from "../AuthContext/AuthContext";
import { ClickAwayListener } from "@mui/base";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { NavLink } from "react-router-dom";
import { Divider } from "@mui/material";
import { addReview } from "./ReviewProvider";

export const AddReview = ({ open, onClose, book }) => {
  const { isAuthenticated, isAdmin, user } = useAuth();

  const [value, setValue] = React.useState(0);
  const [comment, setComment] = React.useState("");

  const handleSubmit = async () => {
    const review = {
      comment: comment,
      rating: value,
      userId: user.id,
      bookId: book.id,
    };
    const frontEndReview = { ...review, user, book };

    try {
      const response = await addReview(review);
      console.log(response);
      if (response) {
        onClose(frontEndReview);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={open ? "add-review-wrapper" : "closed"}>
      <ClickAwayListener onClickAway={() => onClose(null)}>
        <motion.div animate={{ opacity: open ? 1 : 0 }} className="add-review">
          {!isAuthenticated ? (
            <div className="no-login">
              <p className="no-login-p">Please Login to add a Review</p>
              <NavLink to="/login">
                <button className="no-login-button">Login</button>
              </NavLink>
            </div>
          ) : (
            <>
              <div className="rating">
                <p className="book-title-review">Rate - "{book.title}"</p>
                <p className="book-author-review">by {book.author}</p>
              </div>
              <div className="actual-rating">
                <div className="mui-rating">
                  <Typography
                    component="legend"
                    sx={{ fontSize: "1.2rem", color: "white" }}
                  >
                    Your Rating
                  </Typography>
                  <Rating
                    precision={0.5}
                    name="customized-color"
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                    sx={{
                      "& .MuiRating-iconFilled": {
                        color: "#ff6d75",
                      },
                      "& .MuiRating-iconHover": {
                        color: "#ff3d47",
                      },
                      "& .MuiRating-iconEmpty": {
                        color: "#e4e5e9",
                      },
                      fontSize: "2rem",
                    }}
                  />
                </div>
                <div className="rating-divider">
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{
                      backgroundColor: "#D8D8D8",
                      width: "1px",
                    }}
                  />
                </div>
                <TextField
                  id="standard-multiline-static"
                  label="Comment"
                  multiline
                  rows={5}
                  placeholder="Give a comment for your rating."
                  variant="filled"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  sx={{
                    marginLeft: "4rem",
                    "& .MuiFilledInput-root": {
                      backgroundColor: "rgb(66, 66, 66)",
                      color: "white",
                    },
                    "& .MuiInputLabel-root": {
                      color: "white",
                    },
                    "& .MuiFilledInput-underline:before": {
                      borderBottomColor: "white",
                    },
                    "& .MuiFilledInput-underline:after": {
                      borderBottomColor: "white",
                    },
                    "& .MuiFilledInput-root:hover:not(.Mui-disabled):before": {
                      borderBottomColor: "white",
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "white",
                      },
                      "&:hover fieldset": {
                        borderColor: "white",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "white",
                      },
                    },
                  }}
                />
              </div>
              <div className="add-review-buttons">
                <button
                  className="cancel-button-review"
                  onClick={() => onClose(null)}
                >
                  Cancel
                </button>
                <button className="submit-button-review" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </>
          )}
        </motion.div>
      </ClickAwayListener>
    </div>
  );
};
