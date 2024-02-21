import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { IoIosAddCircleOutline } from "react-icons/io";
import "./BookForm.css";

export const BookForm = ({ book = {}, onSubmit }) => {
  const [title, setTitle] = useState(book.title || "");
  const [author, setAuthor] = useState(book.author || "");
  const [description, setDescription] = useState(book.description || "");
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const bookData = new FormData();
    bookData.append("title", title);
    bookData.append("author", author);
    bookData.append("description", description);
    if (image) {
      bookData.append("imageFile", image);
    }
    onSubmit(bookData);
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      const fileURL = URL.createObjectURL(e.target.files[0]);
      setPreviewUrl(fileURL); // Set the preview URL for the selected file
    }
  };
  return (
    <div className="formHolder">
      <form onSubmit={handleSubmit} className="form">
        <TextField
          fullWidth
          required
          id="outlined-basic"
          placeholder="Title of the Book"
          type="text"
          label="Title"
          value={title}
          InputLabelProps={{
            sx: { color: "gray", "&.Mui-focused": { color: "gray" } },
          }}
          InputProps={{
            sx: {
              color: "black",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "2px solid blue",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "gray",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "2px solid #f5c013",
              },
            },
          }}
          onChange={(e) => setTitle(e.target.value)}
          variant="filled"
        />
        <TextField
          fullWidth
          required
          id="outlined-basic"
          placeholder="Type the Book's Author"
          type="text"
          label="Author"
          value={author}
          InputLabelProps={{
            sx: { color: "gray", "&.Mui-focused": { color: "gray" } },
          }}
          InputProps={{
            sx: {
              color: "black",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "2px solid blue",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "gray",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "2px solid #f5c013",
              },
            },
          }}
          onChange={(e) => setAuthor(e.target.value)}
          variant="filled"
        />

        <TextField
          fullWidth
          id="filled-basic"
          multiline
          rows={4}
          placeholder="Short Description"
          type="text"
          label="Description"
          value={description}
          InputLabelProps={{
            sx: { color: "gray", "&.Mui-focused": { color: "gray" } },
          }}
          InputProps={{
            sx: {
              color: "black",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "2px solid blue",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "gray",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "2px solid #f5c013",
              },
            },
          }}
          onChange={(e) => setDescription(e.target.value)}
          variant="filled"
        />

        <TextField
          id="outlined-basic"
          required
          type="File"
          InputLabelProps={{
            sx: { color: "black", "&.Mui-focused": { color: "black" } },
          }}
          InputProps={{
            sx: {
              color: "white",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "2px solid blue",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "gray",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "2px solid #f5c013",
              },
            },
          }}
          onChange={handleImageChange}
          variant="outlined"
        />

        <div className="imageHoldingDiv">
          {previewUrl && (
            <img src={previewUrl} alt="Preview" className="img-preview" />
          )}
        </div>
        <button type="submit" className="button">
          <IoIosAddCircleOutline style={{ fontSize: "1.7rem" }} /> Add Book
        </button>
      </form>
    </div>
  );
};
