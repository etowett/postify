"use client";

import { gql, useMutation, useQuery } from "@apollo/client";
import { Box, Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
const GET_POST_DETAIL = gql`
  query Post($postId: String!) {
    post(postId: $postId) {
      _id
      title
      content
      author {
        _id
        name
      }
    }
    commentsByPost(postId: $postId) {
      _id
      content
      author {
        _id
        name
      }
    }
  }
`;

const CREATE_COMMENT = gql`
  mutation CreateComment($input: CreateCommentInput!) {
    createComment(createCommentInput: $input) {
      _id
      content
    }
  }
`;

export default function PostDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [commentText, setCommentText] = useState("");

  const { data, loading, error, refetch } = useQuery(GET_POST_DETAIL, {
    variables: { postId: id },
    skip: !id,
  });

  const [createComment] = useMutation(CREATE_COMMENT);

  if (loading) return <Box>Loading...</Box>;
  if (error) return <Box>Error: {error.message}</Box>;

  const handleComment = async () => {
    try {
      await createComment({
        variables: { input: { postId: id, content: commentText } },
      });
      setCommentText("");
      refetch();
    } catch (err: any) {
      console.error(err);
    }
  };

  const post = data?.post;
  const comments = data?.commentsByPost;

  return (
    <Box>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <hr />
      <h3>Comments</h3>
      {comments.map((comment: any) => (
        <div key={comment._id} style={{ marginBottom: "1rem" }}>
          <strong>{comment.author?.name}:</strong> {comment.content}
        </div>
      ))}
      <div style={{ marginTop: "1rem" }}>
        <TextField
          label="Write a comment"
          multiline
          rows={3}
          fullWidth
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "0.5rem" }}
          onClick={handleComment}
        >
          Submit Comment
        </Button>
      </div>
    </Box>
  );
}
