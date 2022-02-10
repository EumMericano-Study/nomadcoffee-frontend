import { NavigateFunction } from "react-router-dom";
import { makeVar } from "@apollo/client";

const TOKEN = "TOKEN";

export const isLoggedInVar = makeVar<boolean>(
  Boolean(localStorage.getItem(TOKEN))
);
export const signInUser = (token: string) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

export const signOutUser = (navigate: NavigateFunction) => {
  localStorage.removeItem(TOKEN);
  navigate("/", { state: { username: "", password: "" } });
  window.location.reload();
};
