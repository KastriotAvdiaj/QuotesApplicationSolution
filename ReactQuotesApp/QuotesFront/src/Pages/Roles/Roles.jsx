import React, { useState, useEffect } from "react";
import { getRoles } from "./RolesService";

export const Roles = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const rolesData = await getRoles();
      console.log(rolesData);
      setRoles(rolesData);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  return (
    <div>
      <h2>Roles</h2>
      <ul>
        {roles.map((role, index) => (
          <li key={index}>
            Role : {role.role} - Access : {role.access}
          </li>
        ))}
      </ul>
    </div>
  );
};
