import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { useMediaQuery } from "react-responsive";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { HelmetProvider } from "react-helmet-async";
import { AuthCont, ThemeCont, ScreenTypeCont, client } from "apollo";
import { lightTheme, darkTheme, GlobalStyles } from "styles";
import { ROUTES } from "constant";

import Home from "screens/home";
import SignIn from "screens/auth/signIn";
import SignUp from "screens/auth/signUp";
import CreateShop from "screens/shop/createShop";
import ShopDetail from "screens/shop/detailShop";
import NotFound from "screens/NotFound";

function App() {
  const isLoggedIn = useReactiveVar(AuthCont.isLoggedInVar);
  const isDarkMode = useReactiveVar(ThemeCont.isDarkModeVar);

  const isPC = useMediaQuery({ query: "(min-width: 1024px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 650px) and (max-width: 1023px)",
  });
  const isMobile = useMediaQuery({
    query: "(max-width: 649px)",
  });

  useEffect(() => {
    ScreenTypeCont.setScreenType({ isPC, isTablet, isMobile });
  }, [isPC, isTablet, isMobile]);

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
              <Route
                path={ROUTES.CREATE}
                element={isLoggedIn ? <CreateShop /> : <NotFound />}
              />
              <Route path={`${ROUTES.DETAIL}/:id`} element={<ShopDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}
export default App;
