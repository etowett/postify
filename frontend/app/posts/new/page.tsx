"use client";

import { gql, useMutation, useQuery } from "@apollo/client";
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

const CREATE_POST = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(createPostInput: $input) {
      _id
      title
    }
  }
`;

const GET_CATEGORIES = gql`
  query {
    categories {
      _id
      name
    }
  }
`;

export default function CreatePost() {
  const [form, setForm] = useState({ title: "", content: "", categoryId: "" });
  const [createPost] = useMutation(CREATE_POST);
  const { data: catData } = useQuery(GET_CATEGORIES);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await createPost({ variables: { input: form } });
      alert("Post created!");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <Box>
      <h2>Create Post</h2>
      <TextField
        label="Title"
        name="title"
        fullWidth
        margin="normal"
        value={form.title}
        onChange={handleChange}
      />
      <TextField
        label="Content"
        name="content"
        multiline
        rows={4}
        fullWidth
        margin="normal"
        value={form.content}
        onChange={handleChange}
      />
      <div style={{ margin: "1rem 0" }}>
        <label>Category: </label>
        <select
          name="categoryId"
          value={form.categoryId}
          onChange={handleChange}
        >
          <option value="">Select a category</option>
          {catData?.categories?.map((cat: any) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Create
      </Button>
    </Box>
  );
}
