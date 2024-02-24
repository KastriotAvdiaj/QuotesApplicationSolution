import * as React from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { CreateBook } from "../../Components/Books/CreateBook";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({
  open,
  handleClose,
  onBookCreationSuccess,
}) {
  return (
    <React.Fragment>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "sticky", backgroundColor: "#D4AA22" }}>
          <Toolbar sx={{ backgroundColor: "#D4AA22" }}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Creating a new Book
            </Typography>
          </Toolbar>
        </AppBar>
        <CreateBook onBookCreationSuccess={onBookCreationSuccess} />
      </Dialog>
    </React.Fragment>
  );
}
