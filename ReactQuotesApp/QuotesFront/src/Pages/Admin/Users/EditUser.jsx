import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../Components/AuthContext/AuthContext";
import { GetUser, deleteUsers, updateUser } from "./UsersService";
import { getRoles } from "../../Roles/RolesService";
import "./EditUser.css";
import Alert from "@mui/material/Alert";
import { NavLink, useNavigate } from "react-router-dom";
import {
  MenuItem,
  Select,
  FormControl,
  Button,
  CircularProgress,
} from "@mui/material";

export const EditUser = () => {
  const navigate = useNavigate();
  let { userId } = useParams();
  const [roles, setRoles] = useState([]);
  const [user, setUser] = useState({});
  const { isAuthenticated } = useAuth();
  const [userValues, setUserValues] = useState({
    Username: "",
    NormalizedUsername: "",
    Email: "",
    NormalizedEmail: "",
    Role: "",
  });
  const [originalUserValues, setOriginalUserValues] = useState({});
  const [isEnabled, setIsEnabled] = useState(true);
  const [isAlertOpen, setAlertOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEnabledButtonClick = () => {
    setIsEnabled(!isEnabled);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserValues({
      ...userValues,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await GetUser(userId);
        const rolesData = await getRoles();
        setRoles(rolesData);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [userId]);

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      setUserValues({
        Username: user.username,
        NormalizedUsername: user.normalizedUsername,
        Email: user.email,
        NormalizedEmail: user.normalizedEmail,
        Role: user.roleName,
      });
      setOriginalUserValues({
        Username: user.username,
        NormalizedUsername: user.normalizedUsername,
        Email: user.email,
        NormalizedEmail: user.normalizedEmail,
        Role: user.roleName,
      });
    }
  }, [user]);

  const onDiscard = () => {
    navigate("/admin/users");
  };

  const saveChanges = async () => {
    const hasChanges =
      JSON.stringify(userValues) !== JSON.stringify(originalUserValues);
    if (hasChanges) {
      setIsLoading(true);
      const response = await updateUser(userId, userValues);
      if (response.ok) {
        setTimeout(() => {
          setAlertOpen(true);
        }, 1000);
        setIsEnabled(true);
        setTimeout(() => {
          setAlertOpen(false);
          navigate("/admin/users");
          setIsLoading(false);
        }, 2500);
      }
    } else {
      console.log("No changes to save.");
    }
  };

  return (
    <>
      {isAuthenticated ? (
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
                fontSize: "1rem",
              }}
            >
              Successfully Updated User!
            </Alert>
          )}

          <h2 className="editUserh2">Edit User</h2>
          <div className="mainEditUsersDiv">
            <div className="editUserContainer">
              <div>
                <p className="informationDescription">User Id</p>
                <p className="informationDescription">Username</p>
                <p className="informationDescription">Normalized Username</p>
                <p className="informationDescription">Email</p>
                <p className="informationDescription">Normalized Email</p>
                <p className="informationDescription">Role</p>
              </div>
              <div>
                <p className="userInformation disabled">{userId}</p>
                <p
                  className={
                    isEnabled ? "userInformation disabled" : "userInformation"
                  }
                >
                  <input
                    type="text"
                    name="Username"
                    value={userValues.Username}
                    onChange={handleInputChange}
                    disabled={isEnabled}
                  />
                </p>
                <p className="userInformation disabled">
                  {userValues.NormalizedUsername}
                </p>
                <p
                  className={
                    isEnabled ? "userInformation disabled" : "userInformation"
                  }
                >
                  <input
                    type="text"
                    name="Email"
                    value={userValues.Email}
                    onChange={handleInputChange}
                    disabled={isEnabled}
                  />
                </p>
                <p className="userInformation disabled">
                  {userValues.NormalizedEmail}
                </p>
                <div className="selectAndEnableButtonDiv">
                  <FormControl
                    className={
                      isEnabled ? "userInformation disabled" : "userInformation"
                    }
                  >
                    <Select
                      value={userValues.Role}
                      onChange={handleInputChange}
                      name="Role"
                      disabled={isEnabled}
                    >
                      {roles.map((role) => (
                        <MenuItem key={role.id} value={role.role}>
                          {role.role}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <button
                    onClick={handleEnabledButtonClick}
                    className="enableEditingButton"
                  >
                    {isEnabled ? "Enable" : "Disable"} Editing
                  </button>
                </div>
              </div>
            </div>
            <div className="editUsersButtonDiv">
              <Button
                variant="contained"
                color="primary"
                onClick={saveChanges}
                sx={{ width: "150px" }}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Save Changes"
                )}
              </Button>
              <Button variant="contained" color="secondary" onClick={onDiscard}>
                Discard Changes
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="accessDenied">
          <p>
            Access Denied! <br /> You don't have access to this page.
          </p>
          <NavLink to="/login">
            {" "}
            <Button variant="contained" color="primary">
              Login
            </Button>
          </NavLink>
        </div>
      )}
    </>
  );
};
