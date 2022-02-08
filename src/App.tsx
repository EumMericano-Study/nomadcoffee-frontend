import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { ThemeProvider } from "styled-components";
import { isLoggedInVar, isDarkModeVar, client } from "apollo";
import { HelmetProvider } from "react-helmet-async";
import { lightTheme, darkTheme, GlobalStyles } from "styles";
import { ROUTES } from "constant";

import Home from "screens/Home";
import SignIn from "screens/auth/signIn";
import SignUp from "screens/auth/signUp";
import NotFound from "screens/NotFound";

function App() {
    const isLoggedIn = useReactiveVar(isLoggedInVar);
    const isDarkMode = useReactiveVar(isDarkModeVar);

    return (
        <ApolloProvider client={client}>
            <HelmetProvider>
                <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
                    <GlobalStyles />
                    <Router>
                        <Routes>
                            <Route
                                path={ROUTES.HOME}
                                element={isLoggedIn ? <Home /> : <SignIn />}
                            />
                            <Route
                                path={ROUTES.SIGN_UP}
                                element={isLoggedIn ? <NotFound /> : <SignUp />}
                            />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Router>
                </ThemeProvider>
            </HelmetProvider>
        </ApolloProvider>
    );
}
export default App;
