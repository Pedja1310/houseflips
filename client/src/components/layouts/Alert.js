import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alerts = ({ alerts }) =>
  alerts.length > 0 &&
  alerts.map(alert => (
    <div
      className="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3"
      role="alert"
    >
      <p>{alert.msg}</p>
    </div>
  ));

Alerts.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alerts
});

export default connect(mapStateToProps)(Alerts);
