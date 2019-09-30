import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Normalize } from "styled-normalize";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import Header from "./components/layouts/Header";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Portfolio from "./components/portfolio/Portfolio";
import PrivateRoute from "./components/routing/PrivateRoute";
import Alerts from "./components/layouts/Alerts";
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
            <div
              className="container"
              style={{ maxWidth: "1200px", padding: "2rem" }}
            >
              <Alerts />
              <Switch>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/portfolio" component={Portfolio} />
              </Switch>
            </div>
          </Fragment>
        </ThemeProvider>
      </Router>
    </Provider>
  );
}

export default App;
