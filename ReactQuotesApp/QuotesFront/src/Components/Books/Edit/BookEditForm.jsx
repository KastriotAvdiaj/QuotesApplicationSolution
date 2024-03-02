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
  const handleClickedOutsideTheForm = (e) => {
    if (!e.target.closest(".mainEditFormDiv")) {
      handleVisibility();
    }
  };

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

  const { books, updateTheBook } = useContext(BooksContext);

  const [disabled, setDisabled] = useState({
    title: true,
    author: true,
    description: true,
  });

  useEffect(() => {
    setValue({
      title: bookToEdit.title || "",
      author: bookToEdit.author || "",
      description: bookToEdit.description || "",
    });
  }, [bookToEdit]);

  const [value, setValue] = useState({
    title: "",
    author: "",
    description: "",
  });

  const [imageBase64, setImageBase64] = useState("");
  const [imageWidth, setImageWidth] = useState("200px");
  const [imageFile, setImageFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result
          .replace("data:", "")
          .replace(/^.+,/, "");
        setImageBase64(base64String);
        setImageWidth("100px");
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleDisabledField = (fieldName) => {
    setDisabled((prevState) => ({
      ...prevState,
      [fieldName]: !prevState[fieldName],
    }));
  };

  const handleRemoveImage = () => {
    setImageBase64(null);
    setImageWidth("200px");
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
                value={value.title}
                disabled={disabled.title}
                placeholder="Title"
                sx={textFieldStyles}
              />
              <button onClick={() => toggleDisabledField("title")}>
                <GrEdit />
              </button>
            </div>
            <div className="individualTextFieldWrapperDiv">
              <TextField
                id="outlined-basic"
                multiline
                value={value.author}
                placeholder="Author"
                variant="outlined"
                disabled={disabled.author}
                sx={textFieldStyles}
              />
              <button onClick={() => toggleDisabledField("author")}>
                <GrEdit />
              </button>
            </div>
            <div className="individualTextFieldWrapperDiv">
              <TextField
                id="outlined-textarea"
                multiline
                maxRows={4}
                value={value.description}
                disabled={disabled.description}
                placeholder="Description"
                variant="outlined"
                sx={textFieldStyles}
              />
              <button onClick={() => toggleDisabledField("description")}>
                <GrEdit />
              </button>
            </div>
            <div className="imageDisplayAndChange">
              {bookToEdit.imageBase64 && (
                <>
                  <div className="imageContainer" style={{ width: imageWidth }}>
                    {/* {imageBase64 && <h4>Old Image</h4>} */}
                    <img
                      src={`data:image/jpeg;base64,${bookToEdit.imageBase64}`}
                      alt="Book Cover"
                      style={{ width: imageWidth }}
                      className="imageViewInEdit"
                    />
                    <div
                      onClick={handleRemoveImage}
                      className={
                        imageBase64 ? "imageOverlay" : "imageOverlay hidden"
                      }
                    >
                      <span className="overlayText">Use Old Image</span>
                    </div>
                  </div>
                </>
              )}
              {imageBase64 && (
                <>
                  <div className="imageContainer" style={{ width: imageWidth }}>
                    <img
                      src={`data:image/jpeg;base64,${imageBase64}`}
                      alt="New Book Cover"
                      className="imageViewInEdit"
                      style={{ width: imageWidth }}
                    />
                    <button
                      onClick={handleRemoveImage}
                      className="removeImageButton"
                    >
                      x
                    </button>
                  </div>
                </>
              )}
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <label htmlFor="imageUpload" className="imageUploadButton">
                <IoCloudUploadSharp /> Upload Image
              </label>
            </div>
          </div>
          <div className="editBookFormButtonsDiv">
            <button>Save</button>
            <button onClick={handleVisibility}>Close</button>
          </div>
        </div>
      </div>
    </>
  );
};
