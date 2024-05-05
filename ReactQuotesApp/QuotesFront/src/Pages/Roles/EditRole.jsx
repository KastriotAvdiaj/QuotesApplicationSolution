// EditRole.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../Components/AuthContext/AuthContext";
import "./EditRole.css";
import Alert from "@mui/material/Alert";
import { Button } from "@mui/material";
import { updateRole } from "./RolesService";
import { NavLink, useNavigate } from "react-router-dom";

export const EditRole = () => {
  const { roleName } = useParams();
  const [role, setRole] = useState(null);
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isAlertOpen, setAlertOpen] = useState(false);
  const [isErrorAlertOpen, setErrorAlertOpen] = useState(false);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7099/singleRole/${roleName}`
        );
        setRole(response.data);
      } catch (error) {
        console.error("Error fetching role:", error);
      }
    };

    fetchRole();
  }, [roleName]);

  const handleRoleChange = (e) => {
    setRole({ ...role, role: e.target.value });
  };

  const handleAccessChange = (e) => {
    setRole({ ...role, access: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!role.role.trim() || !role.access.trim()) {
      setErrorAlertOpen(true);
      setMessage("Role and Access fields cannot be empty!");
      setTimeout(() => {
        setErrorAlertOpen(false);
        setMessage("");
      }, 2000);
      return;
    }

    const roleRegex = /^[A-Za-z ]{1,10}$/;
    const accessRegex = /^[A-Za-z ]{1,13}$/;

    if (!roleRegex.test(role.role)) {
      setErrorAlertOpen(true);
      setMessage(
        "Role should contain only letters and spaces and have a maximum of 10 characters!"
      );
      setTimeout(() => {
        setErrorAlertOpen(false);
        setMessage("");
      }, 2000);
      return;
    }

    if (!accessRegex.test(role.access)) {
      setErrorAlertOpen(true);
      setMessage(
        "Access should contain only letters and spaces and have a maximum of 13 characters!"
      );
      setTimeout(() => {
        setErrorAlertOpen(false);
        setMessage("");
      }, 3000);
      return;
    }
    try {
      const updatedRole = { role: role.role, access: role.access, id: role.id };
      const response = await updateRole(role.id, updatedRole);
      if (response.ok) {
        setMessage("Successfully Updated Role");
        setAlertOpen(true);
        setTimeout(() => {
          setAlertOpen(false);
          setMessage("");
          navigate("/admin/roles");
        }, 2500);
        return;
      }
      console.log("Role saved:", role);
    } catch (error) {
      console.error("Error saving role:", error);
    }
  };

  if (!role) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {isAlertOpen && (
        <Alert
          variant="filled"
          severity="success"
          className={`alert-positioned`}
          sx={{
            width: "30%",
            boxShadow: "-3px 8px 8px rgb(0,0,0,0.6)",
            marginTop: "35rem",
            marginLeft: "4rem",
            fontSize: "1rem",
          }}
        >
          {message}
        </Alert>
      )}
      {isErrorAlertOpen && (
        <Alert
          variant="filled"
          severity="error"
          className={`alert-positioned`}
          sx={{
            width: "40%",
            boxShadow: "-3px 8px 8px rgb(0,0,0,0.6)",
            marginTop: "18rem",
            marginLeft: "5rem",
            fontSize: "1rem",
          }}
        >
          {message}
        </Alert>
      )}
      {isAuthenticated && isAdmin ? (
        <div className="edit-role-container">
          <h2 className="edit-role-heading">
            Editing Role -{" "}
            <span className="edit-role-roleName-span">{roleName}</span>
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="roleName" className="edit-role-label">
                Role Name:
              </label>
              <input
                type="text"
                id="roleName"
                name="roleName"
                value={role.role}
                onChange={handleRoleChange}
                className="edit-role-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="access" className="edit-role-label">
                Access:
              </label>
              <input
                type="text"
                id="access"
                name="access"
                value={role.access}
                onChange={handleAccessChange}
                className="edit-role-input"
              />
            </div>
            <NavLink to="/admin/roles">
              <Button sx={{ marginRight: "1rem" }}>Cancel</Button>
            </NavLink>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </form>
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
