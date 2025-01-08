"use client";

import { gql, useMutation } from "@apollo/client";
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

const REGISTER = gql`
  mutation RegisterUser($input: CreateUserInput!) {
    registerUser(createUserInput: $input) {
      _id
      email
      name
    }
  }
`;

export default function Register() {
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [registerUser] = useMutation(REGISTER);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await registerUser({ variables: { input: form } });
      alert("Registration successful!");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <Box>
      <h2>Register</h2>
      <TextField
        label="Name"
        name="name"
        fullWidth
        margin="normal"
        value={form.name}
        onChange={handleChange}
      />
      <TextField
        label="Email"
        name="email"
        fullWidth
        margin="normal"
        value={form.email}
        onChange={handleChange}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        fullWidth
        margin="normal"
        value={form.password}
        onChange={handleChange}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Register
      </Button>
    </Box>
  );
}
