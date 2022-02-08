import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

const TOKEN = "TOKEN";

export const isLoggedInVar = makeVar<boolean>(
    Boolean(localStorage.getItem(TOKEN))
);

export const signInUser = (token: string) => {
    localStorage.setItem(TOKEN, token);
    isLoggedInVar(true);
};

export const signOutUser = () => {
    localStorage.removeItem(TOKEN);
    window.location.reload();
};

export const isDarkModeVar = makeVar<boolean>(false);

export const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
});
