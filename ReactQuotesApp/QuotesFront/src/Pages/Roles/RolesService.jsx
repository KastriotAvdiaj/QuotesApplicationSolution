export const getRoles = async () => {
  try {
    const response = await fetch("https://localhost:7099/api/Roles");
    const roles = await response.json();
    return roles;
  } catch (e) {
    console.error(e);
  }
};

export const createRole = async (newRole) => {
  try {
    const response = await fetch("https://localhost:7099/api/Roles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRole),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error("Error creating role:", error);
    throw error;
  }
};

export const deleteRole = async (role) => {
  try {
    const response = await fetch(`https://localhost:7099/api/Roles/${role}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (e) {
    console.error(e);
  }
};

export const updateRole = async (roleId, updatedRole) => {
  try {
    const response = await fetch(`https://localhost:7099/api/Roles/${roleId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedRole),
    });
    console.log(response);
    return response;
  } catch (e) {
    console.error(e);
  }
};
