import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

const httpLink = createUploadLink({
  uri:
    process.env.NODE_ENV === "production"
      ? "https://dashboard.heroku.com/apps/nomad-sexy-coffee/graphql"
      : "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("TOKEN");
  return {
    headers: {
      ...headers,
      authorization: token || "",
    },
  };
});

const errorLink = onError(
  ({ graphQLErrors, networkError, forward, operation }) => {
    if (graphQLErrors) {
      // logger.error(graphQLErrors);
    }
    if (networkError) {
      // logger.warn(networkError);
    }
    forward(operation);
  }
);

export const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink.concat(httpLink)]),
  cache: new InMemoryCache(),
});
