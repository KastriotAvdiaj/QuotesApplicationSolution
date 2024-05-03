import React, { useState } from "react";
import "./NewRole.css";
import { NavLink, useNavigate } from "react-router-dom";
import { createRole } from "./RolesService";
import { CircularProgress } from "@mui/material";
import { IoReturnDownBack } from "react-icons/io5";
import Alert from "@mui/material/Alert";
import { useAuth } from "../../Components/AuthContext/AuthContext";
import { VpnLock } from "@mui/icons-material";

const NewRole = () => {
  const [role, setRole] = useState("");
  const [access, setAccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [isAlertOpen, setAlertOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isErrorAlertOpen, setErrorAlertOpen] = useState(false);

  const { isAuthenticated, isAdmin } = useAuth();

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleAccessChange = (event) => {
    setAccess(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(!role.trim() || !access.trim());
    if (!role.trim() || !access.trim()) {
      setErrorAlertOpen(true);
      setErrorMessage("Role and Access fields cannot be empty!");
      setTimeout(() => {
        setErrorAlertOpen(false);
        setErrorMessage("");
      }, 2000);
      return;
    }

    const roleRegex = /^[A-Za-z ]{1,10}$/;
    const accessRegex = /^[A-Za-z ]{1,13}$/;

    if (!roleRegex.test(role)) {
      setErrorAlertOpen(true);
      setErrorMessage(
        "Role should contain only letters and spaces and have a maximum of 10 characters!"
      );
      setTimeout(() => {
        setErrorAlertOpen(false);
        setErrorMessage("");
      }, 2000);
      return;
    }

    if (!accessRegex.test(access)) {
      setErrorAlertOpen(true);
      setErrorMessage(
        "Access should contain only letters and spaces and have a maximum of 13 characters!"
      );
      setTimeout(() => {
        setErrorAlertOpen(false);
        setErrorMessage("");
      }, 3000);
      return;
    }
    const newRole = { role, access };
    try {
      const response = await createRole(newRole);
      if (response.ok) {
        setSuccessMessage("Successfully Created New Role!");
        setAlertOpen(true);
        setTimeout(() => {
          setAlertOpen(false);
          setSuccessMessage("");
          navigate("/admin/roles");
        }, 2000);
      } else if (response.status === 400) {
        const errorData = await response.json();
        if (errorData && errorData.errors && errorData.errors.Name) {
          setErrorAlertOpen(true);
          setErrorMessage(errorData.errors.Name[0]);
          setTimeout(() => {
            setErrorAlertOpen(false);
            setErrorMessage("");
          }, 3000);
        } else {
          console.error("Unknown error occurred:", errorData);
        }
      } else {
        console.error("Unknown error occurred:", response);
      }
    } catch (error) {
      console.error("Error creating role:", error);
      setErrorAlertOpen(true);
      setErrorMessage(
        "There was an error creating the Role. Try a different Name"
      );
      setTimeout(() => {
        setErrorAlertOpen(false);
        setErrorMessage("");
      }, 3000);
    }
  };

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
          {successMessage}
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
          {errorMessage}
        </Alert>
      )}
      {isAuthenticated && isAdmin ? (
        <div className="form-container2">
          <NavLink to="/admin/roles">
            <button className="backButtonNewRole">
              <IoReturnDownBack />
            </button>
          </NavLink>

          <form onSubmit={handleSubmit} className="form2  ">
            <div className="form-group">
              <label htmlFor="role">Role:</label>
              <input
                type="text"
                id="role"
                name="role"
                value={role}
                onChange={handleRoleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="access">Access:</label>
              <input
                type="text"
                id="access"
                name="access"
                value={access}
                onChange={handleAccessChange}
                required
              />
            </div>
            <button type="submit" className="submit-button">
              Submit
            </button>
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

export default NewRole;
