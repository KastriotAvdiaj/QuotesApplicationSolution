import React, { useContext, useState, useEffect } from "react";
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
import QuoteCarousel from "../../Components/Quotes/QuoteCarousel";
import AlertDialog from "../../Components/Mui/AlertDialog";
import { useAuth } from "../../Components/AuthContext/AuthContext";
import {
  createQuote,
  deleteQuotes,
} from "../../Components/Quotes/QuoteService";
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
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const { isAuthenticated } = useAuth();

  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");

  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

  const openDeleteDialog = () => {
    setDialogMessage("Are you sure you want to delete selected quote/quotes?");
    setDialogTitle("Delete selected quote/quotes?");
    setIsAlertDialogOpen(true);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 6000);

    return () => clearInterval(intervalId);
  }, [quotes.length]);

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

  const [isClosing, setIsClosing] = useState(false);

  const handleCloseForm = () => {
    setIsClosing(true);

    setTimeout(() => {
      setIsClosing(false);
      setShowForm(false);
    }, 350);
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
  const quotesPerPage = 9;
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
      const addedQuote = await createQuote(newQuote);
      setShowForm(false);
      addQuote(addedQuote);
      setSuccessMessage("You have successfully added a new quote!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error adding quote:", error);
    }
  };

  // .
  // DELETING THE QUOTE/s
  // .
  const performDelete = async () => {
    try {
      await deleteQuotes(selectedQuotes);
      const updatedQuotes = quotes.filter(
        (quote) => !selectedQuotes.includes(quote.id)
      );
      setQuotes(updatedQuotes);
      setSelectedQuotes([]);
      DisableDeleteButton(true);
      setIsAlertDialogOpen(false);

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
      <div className="imageAndTextContainer">
        <div className="imageAndTextContainer">
          {quotes.length > 0 && (
            <QuoteCarousel quotes={quotes[currentQuoteIndex]} />
          )}
        </div>
      </div>

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
      <AlertDialog
        isOpen={isAlertDialogOpen}
        onClose={() => setIsAlertDialogOpen(false)}
        onConfirm={performDelete}
        dialogMessage={dialogMessage}
        dialogTitle={dialogTitle}
      />
      <SuccessMessage message={successMessage} />
      <div className="buttonContainer">
        <button onClick={() => setShowForm(true)} className="newQuoteButton">
          <IoIosAddCircle className="addIcon" /> New Quote
        </button>

        {isAuthenticated ? (
          <div className="rightButtons">
            <button
              onClick={openDeleteDialog}
              className={
                !isDeleteButtonDisabled
                  ? "deleteButton"
                  : "deleteButton disabled"
              }
              disabled={isDeleteButtonDisabled}
            >
              <MdDeleteForever />
            </button>
            <button className="editButton" onClick={handleCheckBoxes}>
              <FaEdit />
            </button>
          </div>
        ) : (
          <></>
        )}
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
        <QuoteForm
          onAdd={handleAddQuote}
          onClose={handleCloseForm}
          isClosing={isClosing}
        />
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
        itemsCount={quotes.length}
        pageSize={quotesPerPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </div>
  );
};
