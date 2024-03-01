import "./SignleBook.css";
import React from "react";
import { useParams, Navigate } from "react-router-dom";

export const SignleBook = () => {
  const { bookId } = useParams();

  if (!/^\d+$/.test(bookId)) {
    // If bookId is not numeric, redirect to a custom error page or home
    return <Navigate to="/error" replace />;
  }

  return <div>SignleBook</div>;
};
