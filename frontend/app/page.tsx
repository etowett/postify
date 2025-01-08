"use client";

import { gql, useQuery } from "@apollo/client";
import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

const GET_POSTS = gql`
  query Posts($limit: Int!, $page: Int!) {
    posts(limit: $limit, page: $page) {
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

export default function Home() {
  const [page, setPage] = useState(1);
  const { loading, error, data } = useQuery(GET_POSTS, {
    variables: { page, limit: 10 },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Latest Posts</h1>
      <Grid container spacing={2}>
        <Link href="/posts/new" passHref>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "1rem" }}
          >
            Create New Post
          </Button>
        </Link>
        {data?.posts?.map((post: any) => (
          <Grid item xs={12} sm={6} md={4} key={post._id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {post.title}
                </Typography>
                <Typography variant="body2">
                  By {post.author?.name} | Category: {post.category?.name}
                </Typography>
                <Typography variant="body2">{post.excerpt}</Typography>
                <Button component={Link} href={`/posts/${post._id}`}>
                  Read More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
