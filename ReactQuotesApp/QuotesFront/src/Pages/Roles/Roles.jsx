import React, { useState, useEffect } from "react";
import { getRoles } from "./RolesService";
import { Role } from "../../Components/Roles/Role";
import { NavLink } from "react-router-dom";
import { MdAdd } from "react-icons/md";
import "./Roles.css";

export const Roles = () => {
  const [roles, setRoles] = useState([]);

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
  );
};
