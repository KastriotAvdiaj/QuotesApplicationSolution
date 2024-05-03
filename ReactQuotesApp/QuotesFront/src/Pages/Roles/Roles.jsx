import React, { useState, useEffect } from "react";
import { getRoles } from "./RolesService";
import { Role } from "../../Components/Roles/Role";
import { deleteRole } from "./RolesService";
import { NavLink } from "react-router-dom";
import { MdAdd } from "react-icons/md";
import { useAuth } from "../../Components/AuthContext/AuthContext";
import "./Roles.css";
import { FaMinus } from "react-icons/fa6";
import { DeleteRoles } from "./DeleteRoles";

export const Roles = () => {
  const [roles, setRoles] = useState([]);
  const { isAuthenticated, isAdmin } = useAuth();
  const [isDeletRolesOpen, setDeleteRolesOpen] = useState(false);

  const handleClose = () => {
    setDeleteRolesOpen(false);
  };
  useEffect(() => {
    fetchRoles();
  }, []);

  const handleDelete = async (roleNameToDelete) => {
    const response = await deleteRole(roleNameToDelete);
    if (response.ok) {
      console.log(roles);
      setRoles((prevRoles) =>
        prevRoles.filter((role) => role.roleName !== roleNameToDelete)
      );
      handleClose();
    }
  };

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
      <DeleteRoles
        roles={roles}
        open={isDeletRolesOpen}
        handleClose={handleClose}
        handleDelete={handleDelete}
      />
      {isAuthenticated && isAdmin ? (
        <div className="mainRolesDivContainer">
          <h2>Roles</h2>
          <div className="rolesButtonsDiv">
            <button
              className="addRoleButton"
              onClick={() => {
                setDeleteRolesOpen(true);
              }}
            >
              <FaMinus /> Delete Roles
            </button>
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
