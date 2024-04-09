import React, { useState, useEffect } from "react";
import Table2 from "../../../Components/Mui/Table2";
import { GetUsers } from "./UsersService";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const usersData = await GetUsers(); // Assuming GetUsers is a function to fetch users data
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const columns = [
    { Header: "ID", accessor: "id" },
    { Header: "Username", accessor: "username" },
    { Header: "Email", accessor: "email" },
    { Header: "Role", accessor: "roleName" },
    { Header: "Email Verified", accessor: "emailVerified" },
  ];

  console.log(users);
  return (
    <div>
      <h2>Users</h2>
      <Table2 columns={columns} data={users} />
    </div>
  );
};

export default Users;
