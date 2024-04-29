import styled from "styled-components";

export const FormContainer = styled.div`
  max-width: 400px;
  margin: 5rem auto 0 2rem;
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  border-radius: 1px;
`;

export const ErrorMessageContainer = styled.div`
  color: red;
`;

export const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size : 1.2rem;
  cursor: pointer;
  &:hover {
    background-color: #0056b3; /* darker shade of blue */
  }
`;