import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog({ isOpen, onClose, onConfirm }) {
  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            backgroundColor: "#334", // Your desired background color
            color: "#fff", // Adjust text color as needed
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete selected quote/quotes?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{ color: "white" }}
          >
            Are you sure you want to delete selected quote/quotes?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onClose}
            style={{ backgroundColor: "gray", color: "white" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: "red" }}
            onClick={() => {
              onConfirm();
              onClose();
            }}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
