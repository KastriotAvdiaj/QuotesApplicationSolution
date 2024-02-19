import React, { useState } from "react";
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
        <div className="form-group">
          <label className="label">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="label">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input textarea"
          ></textarea>
        </div>
        <div className="form-group">
          <label className="label">Image</label>
          <input type="file" onChange={handleImageChange} className="input" />
          <div className="imageHoldingDiv">
            {previewUrl && (
              <img src={previewUrl} alt="Preview" className="img-preview" />
            )}
          </div>
        </div>
        <button type="submit" className="button">
          Submit
        </button>
      </form>
    </div>
  );
};
