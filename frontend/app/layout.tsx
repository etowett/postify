"use client";

import { ApolloProvider } from "@apollo/client";
import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Link from "next/link";
import * as React from "react";
import { client } from "../apollo-client";
import theme from "../theme";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ApolloProvider client={client}>
          <ThemeProvider theme={theme}>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  <Link
                    href="/"
                    passHref
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    Postify
                  </Link>
                </Typography>
                <Button color="inherit" component={Link} href="/login">
                  Login
                </Button>
                <Button color="inherit" component={Link} href="/register">
                  Register
                </Button>
              </Toolbar>
            </AppBar>
            <Container>{children}</Container>
          </ThemeProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
