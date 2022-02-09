import { makeVar } from "@apollo/client";

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
