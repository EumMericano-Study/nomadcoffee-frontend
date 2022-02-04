import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useReactiveVar } from "@apollo/client";
import { ThemeProvider } from "styled-components";
import { isLoggedInVar, isDarkModeVar } from "apollo";
import { lightTheme, darkTheme, GlobalStyles } from "styles";
import Home from "screens/Home";
import Login from "screens/Login";
import NotFound from "screens/NotFound";

function App() {
    const isLoggedIn = useReactiveVar(isLoggedInVar);
    const isDarkMode = useReactiveVar(isDarkModeVar);

    return (
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
            <GlobalStyles />
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={isLoggedIn ? <Home /> : <Login />}
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}
export default App;
