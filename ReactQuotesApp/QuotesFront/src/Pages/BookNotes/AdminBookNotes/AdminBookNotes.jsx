import React, { useState, useEffect, useContext } from "react";
import "./AdminBookNotes.css";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { Divider } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useAuth } from "../../../Components/AuthContext/AuthContext";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { getBooksWithBookNotes } from "./AdminBookNotesService";
import BasicSpeedDial from "../../../Components/Mui/BasicSpeedDial";
import { BooksContext } from "../../../Components/Books/BooksProvider";

export const AdminBookNotes = () => {
  const [booksWithNotes, setBooksWithNotes] = useState([]);
  const { books } = useContext(BooksContext);
  const { isAuthenticated, isAdmin } = useAuth();
  const [selectedBook, setSelectedBook] = useState("");

  const handleChange = (event) => {
    setSelectedBook(event.target.value);
  };

  useEffect(() => {
    const fetchBooksWithNotes = async () => {
      try {
        const data = await getBooksWithBookNotes();
        setBooksWithNotes(data);
      } catch (error) {
        console.error("Error fetching books with notes:", error);
      }
    };

    fetchBooksWithNotes();
  }, []);

  const getBackgroundColor = (color) => {
    switch (color) {
      case "Blue":
        return "#C8D8F3";
      case "Yellow":
        return "#F2F6B8";
      case "Purple":
        return "#FAC5F8";
      case "Green":
        return "#CEFAC5";
      case "Red":
        return "#FAC5C5";
      default:
        return "#C8D8F3";
    }
  };
  return (
    <>
      {isAuthenticated && isAdmin ? (
        <div className="mainAdminBookNotesDiv">
          <div className="admin-bookNotes-Title">
            You Can Find All The Book Notes Here!
          </div>
          {booksWithNotes.map((book) => (
            <div key={book.bookId}>
              <h2>{book.title}</h2>
              {book.bookNotes.map((note, index) => (
                <Accordion
                  key={index}
                  sx={{
                    margin: "0.5rem",
                    backgroundColor: getBackgroundColor(note.color),
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index}-content`}
                    id={`panel${index}-header`}
                    sx={{ fontWeight: "bolder", fontSize: "1.3rem" }}
                  >
                    {note.title}
                  </AccordionSummary>
                  <AccordionDetails>
                    <p className="admin-bookNotes-note">{note.note}</p>
                    <p className="admin-bookNotes-page">{`Page: ${note.page}`}</p>
                  </AccordionDetails>
                  <AccordionActions>
                    <div className="admin-bookNotes-select">
                      <FormControl>
                        <InputLabel id="demo-simple-select-helper-label">
                          Book
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-helper-label"
                          id="demo-simple-select-helper"
                          value={selectedBook}
                          label="Book"
                          onChange={handleChange}
                          MenuProps={{
                            PaperProps: {
                              style: {
                                maxHeight: 300,
                              },
                            },
                          }}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {books.map((book, index) => (
                            <MenuItem value={book.title} key={index}>
                              {book.title}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>Select a different book</FormHelperText>
                      </FormControl>
                    </div>
                    <BasicSpeedDial />
                  </AccordionActions>
                </Accordion>
              ))}
              <Divider
                sx={{ color: "gray", border: "1px solid", marginTop: "1rem" }}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="accessDenied">
          <p>
            Access Denied! <br /> You don't have access to this page.
          </p>
          <NavLink to="/login">
            {" "}
            <button className="loginButtonAdmin">Login</button>
          </NavLink>
        </div>
      )}
    </>
  );
};
