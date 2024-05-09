import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function ResponsiveDialog({
  isOpen,
  handleClose,
  bookTitle,
  onAgree,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Changes Notes Book?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to change the current book of this note to{" "}
            <span style={{ fontWeight: "bold" }}>"{bookTitle}"</span>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button autoFocus onClick={onAgree}>
            Change
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
