"use client";

import { gql, useMutation } from "@apollo/client";
import { Box, Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

const LOGIN = gql`
  mutation Login($loginUserInput: LoginUserInput!) {
    login(loginUserInput: $loginUserInput) {
      accessToken
    }
  }
`;

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loginMutation] = useMutation(LOGIN);
  const router = useRouter();

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const { data } = await loginMutation({
        variables: { loginUserInput: form },
      });
      localStorage.setItem("token", data.login.accessToken);
      router.push("/");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <Box>
      <h2>Login</h2>
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
        Login
      </Button>
    </Box>
  );
}
