import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Normalize } from "styled-normalize";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import Header from "./components/layouts/Header";
import LandingPage from "./components/layouts/LandingPage";
import Routes from "./components/routing/Routes";

import GlobalStyle from "./components/globalStyles/GlobalStyle";

// redux
import store from "./store";

import theme from "./components/globalStyles/theme";
import { loadUser } from "./actions/auth";

function App() {
  // Load user on first load if there is token
  useEffect(() => {
    if (localStorage.token) {
      store.dispatch(loadUser());
    }
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <Fragment>
            <Normalize />
            <GlobalStyle />
            <Header />
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route component={Routes} />
            </Switch>
          </Fragment>
        </ThemeProvider>
      </Router>
    </Provider>
  );
}

export default App;
