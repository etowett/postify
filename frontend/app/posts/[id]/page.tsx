"use client";

import { gql, useMutation, useQuery } from "@apollo/client";
import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";

const GET_POST = gql`
  query Post($postId: String!) {
    post(postId: $postId) {
      _id
      author {
        _id
        email
        name
      }
      category {
        _id
        name
      }
      content
      title
    }
  }
`;

const GET_COMMENTS = gql`
  query CommentsByPost($postId: String!) {
    commentsByPost(postId: $postId) {
      _id
      author {
        _id
        email
        name
      }
      content
    }
  }
`;

const CREATE_COMMENT = gql`
  mutation CreateComment($createCommentInput: CreateCommentInput!) {
    createComment(createCommentInput: $createCommentInput) {
      _id
      author
      content
      post
    }
  }
`;

export default function PostDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = React.use(params);
  const { id } = resolvedParams;
  const [commentText, setCommentText] = useState("");

  const [createComment] = useMutation(CREATE_COMMENT);

  const {
    data: postData,
    loading: postLoading,
    error: postError,
  } = useQuery(GET_POST, {
    variables: { postId: id },
    skip: !id,
  });

  const {
    data: commentsData,
    loading: commentsLoading,
    error: commentsError,
    refetch: refetchComments,
  } = useQuery(GET_COMMENTS, {
    variables: { postId: id },
    skip: !id,
  });

  if (postLoading || commentsLoading) return <Box>Loading...</Box>;
  if (postError) return <Box>Error loading post: {postError.message}</Box>;
  if (commentsError)
    return <Box>Error loading comments: {commentsError.message}</Box>;

  const post = postData?.post;
  const comments = commentsData?.commentsByPost || [];

  const handleComment = async () => {
    try {
      await createComment({
        variables: {
          createCommentInput: {
            postId: id,
            content: commentText,
          },
        },
      });
      setCommentText("");
      refetchComments();
    } catch (err: any) {
      console.error(err);
    }
  };

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
