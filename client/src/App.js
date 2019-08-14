import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Normalize } from "styled-normalize";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import Header from "./components/layouts/Header";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alerts from "./components/layouts/Alerts";
import GlobalStyle from "./components/globalStyles/GlobalStyle";

// redux
import store from "./store";

import theme from "./components/globalStyles/theme";
import { loadUser } from "./actions/auth";

function App() {
  // Load user on first load if there is token
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <Fragment>
            <Normalize />
            <GlobalStyle />
            <Header />
            <Alerts />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </Fragment>
        </ThemeProvider>
      </Router>
    </Provider>
  );
}

export default App;
