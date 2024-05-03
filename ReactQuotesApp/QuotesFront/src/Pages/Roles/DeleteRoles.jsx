import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import "./DeleteRoles.css"; // Import the CSS file

export const DeleteRoles = ({ roles, open, handleClose, handleDelete }) => {
  const [selectedRole, setSelectedRole] = useState("");

  const handleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  return (
    <Dialog open={open} onClose={handleClose} className="delete-roles-dialog">
      <DialogTitle className="delete-roles-dialog-title">
        Delete Roles
      </DialogTitle>
      <DialogContent className="delete-roles-dialog-content">
        <FormControl
          fullWidth
          className="form-control-mui"
          sx={{ marginTop: "2rem" }}
        >
          <InputLabel id="role-select-label">Select Role</InputLabel>
          <Select
            labelId="role-select-label"
            id="role-select"
            value={selectedRole}
            onChange={handleChange}
            className="delete-roles-select"
            fullWidth
          >
            {roles.map((role, index) => (
              <MenuItem
                key={index}
                value={role.roleName}
                className="delete-roles-menu-item"
              >
                {role.roleName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions className="delete-roles-dialog-actions">
        <Button
          onClick={handleClose}
          color="primary"
          variant="contained"
          className="delete-roles-cancel-button"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            handleDelete(selectedRole);
          }}
          variant="contained"
          color="secondary"
          className="delete-roles-delete-button"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
