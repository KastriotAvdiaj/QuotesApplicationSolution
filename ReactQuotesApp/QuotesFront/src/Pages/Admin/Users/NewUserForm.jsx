import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createUser } from "./UsersService";
import "./NewuserForm.css";

export const NewUserForm = ({ handleNewUserForm, handleNewUserInput }) => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .max(25, "Username must be at most 25 characters")
      .required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await createUser(values);
      handleNewUserForm();
      handleNewUserInput(response);
      console.log(response);
      console.log("User created successfully!");
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="overlay">
      <div className="mainNewUserFormDiv">
        <h2>Create New User</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="user-form">
              <div className="form-field">
                <label htmlFor="username" className="form-label">
                  Username:
                </label>
                <Field type="text" name="username" className="form-input" />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-field">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <Field type="email" name="email" className="form-input" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="form-field">
                <label htmlFor="password" className="form-label">
                  Password:
                </label>
                <Field type="password" name="password" className="form-input" />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="userNewFormButtonDiv">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="submit-button"
                >
                  Submit
                </button>
                <button
                  disabled={isSubmitting}
                  className="cancel-button"
                  onClick={() => {
                    handleNewUserForm();
                  }}
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
