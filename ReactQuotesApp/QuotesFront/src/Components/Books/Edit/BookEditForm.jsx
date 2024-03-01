import React, { useContext, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import "./BookEditForm.css";
import { GrEdit } from "react-icons/gr";
import { styled } from "@mui/material/styles";
import { IoCloudUploadSharp } from "react-icons/io5";
import { HiSwitchHorizontal } from "react-icons/hi";
import { BooksContext } from "../BooksProvider";
import { updateBook } from "../BookService/BookService";

export const BookEditForm = ({
  isOpen,
  handleVisibility,
  bookToEdit,
  handleSuccessUpdate,
}) => {
  const { books, updateTheBook } = useContext(BooksContext);

  const handleClickedOutsideTheForm = (e) => {
    if (!e.target.closest(".mainEditFormDiv")) {
      handleVisibility();
    }
  };

  const InputFile = styled("input")({
    display: "none",
  });

  const textFieldStyles = {
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
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
      "& input": {
        color: "white",
      },
      "& .MuiInputBase-input.Mui-disabled": {
        WebkitTextFillColor: "gray",
      },
      "&.Mui-disabled": {
        "& fieldset": {
          borderColor: "gray", // Gray outline for disabled state
        },
        "& input": {
          color: "gray", // Gray text for disabled state
        },
        "& svg": {
          color: "gray",
        },
        "& .MuiInputBase-input": {
          color: "gray", // Additionally targeting the base input for text color when disabled
        },
        "&::placeholder": {
          color: "gray", // This will make the placeholder text gray (if applicable)
        },
      },
      "& placeholder": {
        color: "gray",
      },
    },
    "& .MuiInputLabel-root": {
      color: "white", // Label color
      "&.Mui-disabled": {
        color: "gray", // Gray label for disabled state
      },
    },
    "& .MuiInputLabel-outlined": {
      color: "gray", // Label color when not focused
    },
    "& .MuiOutlinedInput-input": {
      color: "white", // Placeholder color
    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "& .MuiInputBase-input::placeholder": {
      color: "gray", // Placeholder color
      opacity: 1,
    },
  };

  const handleSuccessfulUpdate = () => {
    console.log("Successfully Updated the book!");
    handleSuccessUpdate();
    setPreviewUrl(null);
    setImageWidth("200px");
    setAuthorDisabled(true);
    setTitleDisabled(true);
    setDescriptionDisabled(true);
    handleVisibility();
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = () => {
    if (
      title === bookToEdit.title &&
      author === bookToEdit.author &&
      description === bookToEdit.description &&
      image === null
    ) {
      console.log("There were no changes detected");
      return;
    }
    const newBook = {
      title: title,
      author: author,
      description: description,
    };
    updateBook(
      bookToEdit.id,
      newBook,
      image,
      handleSuccessfulUpdate,
      updateTheBook
    );
    if (image && activeImage) {
      convertToBase64(image)
        .then((base64Image) => {
          const base64Data = base64Image.split(",")[1];
          updateTheBook({
            id: bookToEdit.id,
            title: title,
            description: description,
            author: author,
            image: base64Data,
          });
          handleSuccessfulUpdate();
        })
        .catch((error) => {
          console.error("Error converting image to base64", error);
        });
    } else {
      updateTheBook({
        id: bookToEdit.id,
        title: title,
        description: description,
        author: author,
        image: bookToEdit.imageBase64,
      });
    }
  };

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setTitle(bookToEdit.title);
    setAuthor(bookToEdit.author);
    setDescription(bookToEdit.description);
  }, [bookToEdit]);

  const handleTitleInput = (e) => {
    setTitle(e.target.value);
  };

  const handleAuthorInput = (e) => {
    setAuthor(e.target.value);
  };

  const handleDescriptionInput = (e) => {
    setDescription(e.target.value);
  };

  const [titleDisabled, setTitleDisabled] = useState(true);
  const [authorDisabled, setAuthorDisabled] = useState(true);
  const [descriptionDisabled, setDescriptionDisabled] = useState(true);

  const [image, setImage] = useState(null);
  const [activeImage, setActiveImage] = useState(true);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [imageWidth, setImageWidth] = useState("200px");

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      const fileURL = URL.createObjectURL(e.target.files[0]);
      setPreviewUrl(fileURL);
      setImageWidth("100px");
    }
  };

  return (
    <>
      <div
        className={isOpen ? "bookEditOutLineDiv" : "bookEditOutLineDiv hidden"}
        onClick={handleClickedOutsideTheForm}
      >
        <div className="mainEditFormDiv">
          <h2>Update Your Book</h2>

          <div className="bookEditTextFieldDiv">
            <div className="individualTextFieldWrapperDiv">
              <TextField
                id="outlined-basic"
                multiline //default value doesn't work unless we add this to all of them
                variant="outlined"
                placeholder="Title"
                disabled={titleDisabled}
                value={title}
                sx={textFieldStyles}
                onChange={handleTitleInput}
              />
              <button
                onClick={() => {
                  setTitleDisabled(!titleDisabled);
                }}
              >
                <GrEdit />
              </button>
            </div>
            <div className="individualTextFieldWrapperDiv">
              <TextField
                id="outlined-basic"
                multiline
                placeholder="Author"
                disabled={authorDisabled}
                value={author}
                variant="outlined"
                sx={textFieldStyles}
                onChange={handleAuthorInput}
              />
              <button
                onClick={() => {
                  setAuthorDisabled(!authorDisabled);
                }}
              >
                <GrEdit />
              </button>
            </div>
            <div className="individualTextFieldWrapperDiv">
              <TextField
                id="outlined-textarea"
                multiline
                maxRows={4}
                placeholder="Description"
                disabled={descriptionDisabled}
                value={description || ""}
                variant="outlined"
                sx={textFieldStyles}
                onChange={handleDescriptionInput}
              />
              <button
                onClick={() => {
                  setDescriptionDisabled(!descriptionDisabled);
                }}
              >
                <GrEdit />
              </button>
            </div>
            <div className="imageDisplayAndChange">
              {bookToEdit.imageBase64 && (
                <img
                  src={`data:image/jpeg;base64,${bookToEdit.imageBase64}`}
                  alt="Book Cover"
                  className={activeImage ? "" : "imageViewInEdit active"}
                  style={{ width: imageWidth }} // Adjust styling as necessary
                />
              )}
              {previewUrl && (
                <>
                  <button
                    className="switchImageButton"
                    onClick={() => {
                      setActiveImage(!activeImage);
                    }}
                  >
                    <HiSwitchHorizontal />
                  </button>
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className={activeImage ? "imageViewInEdit active" : ""}
                    style={{ width: imageWidth }}
                  />
                </>
              )}
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange} // Function to handle file selection
              />
              <label htmlFor="imageUpload" className="imageUploadButton">
                <IoCloudUploadSharp /> Upload Image
              </label>
            </div>
          </div>
          <div className="editBookFormButtonsDiv">
            <button onClick={handleSubmit}>Save</button>
            <button onClick={handleVisibility}>Close</button>
          </div>
        </div>
      </div>
    </>
  );
};
