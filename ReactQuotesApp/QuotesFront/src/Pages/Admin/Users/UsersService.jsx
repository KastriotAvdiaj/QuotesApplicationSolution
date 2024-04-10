import React from "react";

export const GetUsers = async () => {
  try {
    const response = await fetch("https://localhost:7099/api/ApplicationUsers");
    return response.json();
  } catch (e) {
    console.log(e);
  }
};
