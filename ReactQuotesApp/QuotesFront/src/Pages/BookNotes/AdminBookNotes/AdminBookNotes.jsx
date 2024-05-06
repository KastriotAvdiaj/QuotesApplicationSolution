import React, { useState, useEffect } from "react";
import "./AdminBookNotes.css";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { getBooksWithBookNotes } from "./AdminBookNotesService";
import BasicSpeedDial from "../../../Components/Mui/BasicSpeedDial";

export const AdminBookNotes = () => {
  const [booksWithNotes, setBooksWithNotes] = useState([]);

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

  return (
    <>
      <div className="mainAdminBookNotesDiv">
        {booksWithNotes.map((book) => (
          <div key={book.bookId}>
            <h2>{book.title}</h2>
            {book.bookNotes.map((note, index) => (
              <Accordion key={index} sx={{ margin: "0.5rem" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index}-content`}
                  id={`panel${index}-header`}
                >
                  {note.title}
                </AccordionSummary>
                <AccordionDetails>
                  <p>{`Page: ${note.page}`}</p>
                  <p>{note.note}</p>
                </AccordionDetails>
                <AccordionActions>
                  <BasicSpeedDial />
                </AccordionActions>
              </Accordion>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};
