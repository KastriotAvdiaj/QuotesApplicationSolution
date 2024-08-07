import React from "react";

export const GetUsers = async () => {
  try {
    const response = await fetch(
      "https://localhost:7099/api/ApplicationUsers/GetUsers"
    );
    return response.json();
  } catch (e) {
    console.log(e);
  }
};
export const createUser = async (user) => {
  try {
    const response = await fetch(
      "https://localhost:7099/api/ApplicationUsers/PostApplicationUser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );
    if (response.ok) {
      const userData = await response.json();
      return userData;
    } else {
      throw new Error("Failed to create user");
    }
  } catch (e) {
    console.log(e);
  }
};

export const deleteUsers = async (ids) => {
  try {
    const response = await fetch(
      "https://localhost:7099/api/ApplicationUsers/DeleteApplicationUsers",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ids),
      }
    );
    if (response.ok) {
      return response;
    } else {
      throw new Error("Failed to delete users");
    }
  } catch (e) {
    console.log(e);
  }
};

export const GetUser = async (id) => {
  try {
    console.log(id);
    const response = await fetch(
      `https://localhost:7099/api/ApplicationUsers/GetApplicationUser/${id}`
    );
    const userData = await response.json();
    return userData;
  } catch (e) {
    console.log(e);
  }
};

export const updateUser = async (id, newUserData) => {
  try {
    const response = await fetch(
      `https://localhost:7099/api/ApplicationUsers/PutApplicationUser/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserData),
      }
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const updateUserPassword = async (id, newPassword) => {
  try {
    const response = await fetch(
      `https://localhost:7099/api/ApplicationUsers/ChangeUsersPassword/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPassword),
      }
    );
    console.log(response);
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const getUsersRole = async (userName) => {
  try {
    const response = await fetch(
      `https://localhost:7099/api/ApplicationUsers/GetApplicationUseRole/${userName}`
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error("Failed to fetch user role");
  } catch (e) {
    console.log(e);
  }
};

export const getUserByUsername = async (userName) => {
  try {
    const response = await fetch(
      `https://localhost:7099/api/ApplicationUsers/GetApplicationUserByUsername/${userName}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
