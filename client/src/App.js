import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import ButtonAppBar from "./components/layouts/Navbar";
import Register from "./components/auth/Register";
import Alerts from "./components/layouts/Alerts";

// redux
import store from "./store";

import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <ButtonAppBar />
          <Alerts />
          <Switch>
            <Route exact path="/register" component={Register} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
