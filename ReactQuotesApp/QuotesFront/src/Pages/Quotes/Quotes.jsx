import React, { useContext, useState } from "react";
import { QuotesContext } from "../../Components/Quotes/QuotesProvider";
import Quote from "../../Components/Quotes/Quote";
import Pagination from "../../Components/Pagination/Pagination";
import { IoIosAddCircle } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import QuoteForm from "../../Components/Quotes/QuoteForm";
import { MdDeleteForever } from "react-icons/md";
import MaterialUISwitch from "../../Components/Mui/MaterialUISwitch";
import FormControlLabel from "@mui/material/FormControlLabel";
import SuccessMessage from "../../Components/SuccessfullMessage/SuccessMessage";
import { useTheme } from "../../Components/Theme/ThemeContext";
import QuoteEdit from "../../Components/Quotes/QuoteEdit";
import "./Quotes.css";

export const Quotes = () => {
  const { quotes, addQuote, setQuotes } = useContext(QuotesContext);
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedQuotes, setSelectedQuotes] = useState([]);
  const [isDeleteButtonDisabled, DisableDeleteButton] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const { theme, changeTheme } = useTheme();
  const [editButtonDisplay, setEditButtonDisplay] = useState("none");
  const [checkboxDisplay, setCheckboxDisplay] = useState("none");

  const [editingQuote, setEditingQuote] = useState({
    description: "",
    authorName: "",
  });

  const setEditSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleEditButtonClick = (description, authorName, id) => {
    setEditingQuote({ description, authorName, id });
    setShowEditForm(!showEditForm);
  };

  // .
  // THEME MEHTOD
  // .
  const toggleTheme = () => {
    changeTheme(theme === "light" ? "dark" : "light");
  };

  // .
  // CHECKING WHICH CHECKBOXES ARE CHECKED
  // .
  const handleCheckboxChange = (id, isChecked) => {
    setSelectedQuotes((prevSelected) => {
      const newSelectedQuotes = isChecked
        ? [...prevSelected, id]
        : prevSelected.filter((quoteId) => quoteId !== id);

      DisableDeleteButton(newSelectedQuotes.length === 0);

      return newSelectedQuotes;
    });
  };

  // .
  // CLOSING THE CREATE NEW FORM
  // .
  const handleCloseForm = () => {
    setShowForm(false);
  };

  // .
  // REMOVING AND ADDING THE CHECKBOXES/CHANGE BUTTONS FROM THE QUOTE
  // .
  const handleCheckBoxes = () => {
    if (checkboxDisplay === "none") {
      setCheckboxDisplay("inline");
    } else {
      setCheckboxDisplay("none");
    }

    if (editButtonDisplay === "none") {
      setEditButtonDisplay("inline");
    } else {
      setEditButtonDisplay("none");
    }
  };

  // .
  // PAGINATION LOGIC
  // .
  const [currentPage, setCurrentPage] = useState(1);
  const quotesPerPage = 6;
  const totalPages = Math.ceil(quotes.length / quotesPerPage);
  const lastQuoteIndex = currentPage * quotesPerPage;
  const firstQuoteIndex = lastQuoteIndex - quotesPerPage;
  const currentQuotes = quotes.slice(firstQuoteIndex, lastQuoteIndex);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // .
  // CREATING A NEW QUOTE
  // .
  const handleAddQuote = async (newQuote) => {
    try {
      const response = await fetch("https://localhost:7099/api/Quotes/Add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newQuote),
      });

      if (!response.ok) {
        throw new Error("Failed to add the quote.");
      }
      const addedQuote = await response.json();
      addQuote(addedQuote);
      setShowForm(false);

      setSuccessMessage("You have successfully added a new quote!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error adding quote:", error);
    }
  };

  // .
  // DELETING THE QUOTE/s
  // .
  const handleDeleteSelectedQuotes = async () => {
    try {
      const response = await fetch(`https://localhost:7099/api/Quotes/Delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedQuotes),
      });

      if (!response.ok) {
        throw new Error("Failed to delete the selected quotes.");
      }
      const updatedQuotes = quotes.filter(
        (quote) => !selectedQuotes.includes(quote.id)
      );

      setQuotes(updatedQuotes);
      setSelectedQuotes([]);
      DisableDeleteButton(true);
      //Changing the page if all the quotes in that page are deleted
      const newTotalPages = Math.ceil(updatedQuotes.length / quotesPerPage);
      if (currentPage > newTotalPages && currentPage !== 1) {
        setCurrentPage((prevCurrentPage) => Math.max(prevCurrentPage - 1, 1));
      }
      if (newTotalPages < currentPage) {
        setCurrentPage(newTotalPages);
      }

      setSuccessMessage(
        "Selected quote/quotes have been successfully deleted."
      );
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error deleting selected quotes:", error);
    }
  };

  // .
  // CHECKING THE BORDER OF THE QUOTES AND UPDATING IT
  // .
  const whiteOrBlackBorder = theme === "dark" ? "white" : "#092396";

  return (
    <div className="quotesMainDiv">
      <h1>Quotes</h1>
      <FormControlLabel
        control={
          <MaterialUISwitch
            sx={{ m: 1 }}
            checked={theme === "dark"}
            onClick={toggleTheme}
          />
        }
        label={theme.charAt(0).toUpperCase() + theme.slice(1)} // "Dark" or "Light"
      />
      <SuccessMessage message={successMessage} />
      <div className="buttonContainer">
        <button onClick={() => setShowForm(true)} className="newQuoteButton">
          <IoIosAddCircle className="addIcon" /> New Quote
        </button>
        <div className="rightButtons">
          <button
            onClick={handleDeleteSelectedQuotes}
            className={
              !isDeleteButtonDisabled ? "deleteButton" : "deleteButton disabled"
            }
            disabled={isDeleteButtonDisabled}
          >
            <MdDeleteForever />
          </button>
          <button className="editButton" onClick={handleCheckBoxes}>
            <FaEdit />
          </button>
        </div>
      </div>
      {showEditForm && (
        <QuoteEdit
          onCancel={handleEditButtonClick}
          quote={editingQuote.description}
          author={editingQuote.authorName}
          id={editingQuote.id}
          setEditSuccessMessage={setEditSuccessMessage}
        />
      )}
      {showForm && (
        <QuoteForm onAdd={handleAddQuote} onClose={handleCloseForm} />
      )}
      <ul className="quotes-container">
        {currentQuotes.map((quote, index) => (
          <li key={`${currentPage}-${quote.id}`}>
            <Quote
              id={quote.id}
              description={quote.description}
              authorName={quote.authorName}
              onCheckboxChange={handleCheckboxChange}
              isSelected={selectedQuotes.includes(quote.id)}
              theme={theme}
              borderColor={index % 2 === 0 ? "#f5c013" : whiteOrBlackBorder}
              editButtonDisplay={editButtonDisplay}
              checkboxDisplay={checkboxDisplay}
              onEditButtonClick={() =>
                handleEditButtonClick(
                  quote.description,
                  quote.authorName,
                  quote.id
                )
              }
            />
          </li>
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalCount={quotes.length}
        pageSize={quotesPerPage}
        onPageChange={onPageChange}
      />
    </div>
  );
};
