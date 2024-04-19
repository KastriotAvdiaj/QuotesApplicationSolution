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
    const response = await fetch(
      `https://localhost:7099/api/ApplicationUsers/GetApplicationUser/${id}`
    );
    const userData = await response.json();
    return userData;
  } catch (e) {
    console.log(e);
  }
};
