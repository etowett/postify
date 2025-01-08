import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

const httpLink = createHttpLink({
  uri: "http://localhost:7070/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.error("[GraphQL Errors]:");
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `Message: ${message}, Location: ${JSON.stringify(
          locations
        )}, Path: ${path}`
      );
    });
  }

  if (networkError) {
    console.error(`[Network Error]: ${networkError.message}`);
  }
});

const link = ApolloLink.from([errorLink, authLink.concat(httpLink)]);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
