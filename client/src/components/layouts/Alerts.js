import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Alert } from "react-bootstrap";

const Alerts = ({ alerts }) =>
  alerts.length > 0 &&
  alerts.map(alert => (
    <Alert className="" variant={alert.type} role="alert" key={alert.id}>
      {alert.msg}
    </Alert>
  ));

Alerts.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alerts
});

export default connect(mapStateToProps)(Alerts);
