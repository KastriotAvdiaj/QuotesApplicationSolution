import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import "./NewRole.css";
import { NavLink } from "react-router-dom";
import {
  FormContainer,
  FormGroup,
  Label,
  Input,
  ErrorMessageContainer,
  SubmitButton,
} from "./StyledComponents";
import { IoReturnDownBack } from "react-icons/io5";
import { useAuth } from "../../Components/AuthContext/AuthContext";

const NewRole = ({ onSubmit }) => {
  const initialValues = {
    role: "",
    access: "",
  };

  const { isAuthenticated, isAdmin } = useAuth();

  const validationSchema = Yup.object().shape({
    role: Yup.string().required("Role is required"),
    access: Yup.string().required("Access is required"),
  });

  return (
    <>
      {isAuthenticated && isAdmin ? (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            onSubmit(values);
            resetForm();
          }}
        >
          {({ errors, touched }) => (
            <FormContainer>
              <NavLink to="/admin/roles">
                <button className="backButtonNewRole">
                  <IoReturnDownBack />
                </button>
              </NavLink>

              <Form>
                <FormGroup>
                  <Label htmlFor="role">Role</Label>
                  <Input type="text" id="role" name="role" />
                  {errors.role && touched.role && (
                    <ErrorMessageContainer>{errors.role}</ErrorMessageContainer>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="access">Access</Label>
                  <Input type="text" id="access" name="access" />
                  {errors.access && touched.access && (
                    <ErrorMessageContainer>
                      {errors.access}
                    </ErrorMessageContainer>
                  )}
                </FormGroup>
                <SubmitButton type="submit">Submit</SubmitButton>
              </Form>
            </FormContainer>
          )}
        </Formik>
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

export default NewRole;
