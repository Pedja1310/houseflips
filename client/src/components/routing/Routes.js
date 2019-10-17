import React from "react";
import { Switch, Route } from "react-router-dom";
import Register from "../auth/Register";
import Login from "../auth/Login";
import Portfolio from "../portfolio/Portfolio";
import PrivateRoute from "./PrivateRoute";
import Alerts from "../layouts/Alerts";

const Routes = () => {
  return (
    <div className="container" style={{ maxWidth: "1200px", padding: "2rem" }}>
      <Alerts />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/portfolio" component={Portfolio} />
      </Switch>
    </div>
  );
};

export default Routes;
