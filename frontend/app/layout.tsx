"use client";

import { ApolloProvider } from "@apollo/client";
import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { client } from "../apollo-client";
import theme from "../theme";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/");
  };

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
                {isLoggedIn ? (
                  <>
                    <Button
                      color="inherit"
                      component={Link}
                      href="/create-post"
                    >
                      Create Post
                    </Button>
                    <Button color="inherit" onClick={handleLogout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button color="inherit" component={Link} href="/login">
                      Login
                    </Button>
                    <Button color="inherit" component={Link} href="/register">
                      Register
                    </Button>
                  </>
                )}
              </Toolbar>
            </AppBar>
            <Container>{children}</Container>
          </ThemeProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
