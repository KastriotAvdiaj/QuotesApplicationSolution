import React, { useState, useEffect } from "react";
import Table2 from "../../../Components/Mui/Table2";
import { GetUsers } from "./UsersService";
import { FaInfoCircle } from "react-icons/fa";
import "./Users.css";
import { NewUserForm } from "./NewUserForm";
import { useAuth } from "../../../Components/AuthContext/AuthContext";
import { NavLink } from "react-router-dom";
import SuccessMessage from "../../../Components/SuccessfullMessage/SuccessMessage";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [showNewUserForm, setNewUserForm] = useState(false);
  const { isAuthenticated } = useAuth();
  const [successMessage, setSuccessMessage] = useState("");
  const totalUsers = users.length;
  const handleNewUserForm = () => {
    setNewUserForm(!showNewUserForm);
  };

  const handleNewUserInput = (newUser) => {
    setSuccessMessage("Successfully created a new user!");
    setTimeout(() => setSuccessMessage(""), 3000);
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const usersData = await GetUsers();
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const columns = [
    { Header: "ID", accessor: "id" },
    { Header: "Username", accessor: "username" },
    { Header: "Normalized Username", accessor: "normalizedUsername" },
    { Header: "Email", accessor: "email" },
    { Header: "Normalized Email", accessor: "normalizedEmail" },
    { Header: "Role", accessor: "roleName" },
    {
      Header: "Email Verified",
      accessor: "emailVerified",
      Cell: ({ value }) => (value ? "True" : "False"),
    },
  ];

  return (
    <>
      {isAuthenticated ? (
        <div className="mainUsersDiv">
          <SuccessMessage message={successMessage} />
          {showNewUserForm && (
            <NewUserForm
              handleNewUserForm={handleNewUserForm}
              handleNewUserInput={handleNewUserInput}
            />
          )}
          <h1>Application Users</h1>
          <span className="hoverRoleExplanation">
            {" "}
            Role Explanation <FaInfoCircle />
          </span>
          <div className="roleExplanationDiv">
            <p className="roleExplanation">Role explanation :</p>
            <p>
              <span style={{ fontWeight: "bold", fontStyle: "italic" }}>
                User
              </span>{" "}
              = Normal visiting user with no abilities.
            </p>
            <p>
              <span style={{ fontWeight: "bold", fontStyle: "italic" }}>
                Admin
              </span>{" "}
              = Abilities to change/delete items within the application.
            </p>
            <p>
              <span style={{ fontWeight: "bold", fontStyle: "italic" }}>
                SuperAdmin
              </span>{" "}
              = Admin + the ability to perform crud operations on Users.
            </p>
          </div>
          <Table2
            columns={columns}
            data={users}
            handleNewUserForm={handleNewUserForm}
            totalUsers={totalUsers}
          />
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

export default Users;
