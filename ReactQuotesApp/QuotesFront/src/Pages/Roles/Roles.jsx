import React, { useState, useEffect } from "react";
import { getRoles } from "./RolesService";
import { Role } from "../../Components/Roles/Role";
import { NavLink } from "react-router-dom";
import { MdAdd } from "react-icons/md";
import { useAuth } from "../../Components/AuthContext/AuthContext";
import "./Roles.css";

export const Roles = () => {
  const [roles, setRoles] = useState([]);
  const { isAuthenticated, isAdmin } = useAuth();

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const rolesData = await getRoles();
      setRoles(rolesData);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  return (
    <>
      {isAuthenticated && isAdmin ? (
        <div className="mainRolesDivContainer">
          <h2>Roles</h2>
          <div className="rolesButtonsDiv">
            <NavLink to="/admin/roles/newRole">
              <button className="addRoleButton">
                <MdAdd /> Add
              </button>
            </NavLink>
          </div>

          <ul className="rolesUl">
            {roles.map((role) => (
              <li key={role.roleId} className="rolesLi">
                <Role role={role} key={role.roleId} />
              </li>
            ))}
          </ul>
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
