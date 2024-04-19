import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../Components/AuthContext/AuthContext";
import { GetUser, deleteUsers } from "./UsersService";
import "./EditUser.css";
import { NavLink } from "react-router-dom";

export const EditUser = () => {
  let { userId } = useParams();
  const [user, setUser] = useState({});
  const { isAuthenticated } = useAuth();
  const [userValues, setUserValues] = useState({
    Username: "",
    NormalizedUsername: "",
    Email: "",
    NormalizedEmail: "",
    Role: "",
  });

  const [isEnabled, setIsEnabled] = useState(true);

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
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [userId]);

  //! Settting the user values since using the same useEffect as fetchuser doesn't work
  useEffect(() => {
    setUserValues({
      Username: user.username,
      NormalizedUsername: user.normalizedUsername,
      Email: user.email,
      NormalizedEmail: user.normalizedEmail,
      Role: user.roleName,
    });
  }, [user]);

  return (
    <>
      {isAuthenticated ? (
        <>
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
                  {/* {user.username} */}
                  <input
                    type="text"
                    name="Username"
                    value={userValues.Username}
                    onChange={handleInputChange}
                    disabled={isEnabled}
                  />
                </p>
                <p
                  className={
                    isEnabled ? "userInformation disabled" : "userInformation"
                  }
                >
                  {/* {user.normalizedUsername} */}
                  <input
                    type="text"
                    name="NormalizedUsername"
                    value={userValues.NormalizedUsername}
                    onChange={handleInputChange}
                    disabled={isEnabled}
                  />
                </p>
                <p
                  className={
                    isEnabled ? "userInformation disabled" : "userInformation"
                  }
                >
                  {/* {user.email} */}
                  <input
                    type="text"
                    name="Email"
                    value={userValues.Email}
                    onChange={handleInputChange}
                    disabled={isEnabled}
                  />
                </p>
                <p
                  className={
                    isEnabled ? "userInformation disabled" : "userInformation"
                  }
                >
                  {/* {user.normalizedEmail} */}
                  <input
                    type="text"
                    name="NormalizedEmail"
                    value={userValues.NormalizedEmail}
                    onChange={handleInputChange}
                    disabled={isEnabled}
                  />
                </p>
                <p
                  className={
                    isEnabled ? "userInformation disabled" : "userInformation"
                  }
                >
                  {/* {user.roleName} */}
                  <input
                    type="text"
                    name="Role"
                    value={userValues.Role}
                    onChange={handleInputChange}
                    disabled={isEnabled}
                  />
                </p>
                <button
                  onClick={handleEnabledButtonClick}
                  className="enableEditingButton"
                >
                  {isEnabled ? "Enable" : "Disable"} Editing
                </button>
              </div>
            </div>
            <div className="editUsersButtonDiv">
              <button>Save Changes</button>
              <button>Discard Changes</button>
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
            <button className="loginButtonAdmin">Login</button>
          </NavLink>
        </div>
      )}
    </>
  );
};
