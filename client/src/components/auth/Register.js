import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/auth";
import { setAlert } from "../../actions/alerts";

const Register = ({ register, setAlert }) => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  const { name, email, password, password2 } = formState;

  const handleChange = e => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();

    if (password !== password2) {
      setAlert("Please enter matching passwords", "danger");
    } else {
      register({ name, email, password });
    }
  };

  return (
    <div>
      <h1>World</h1>
    </div>
  );
};

Register.propType = {
  register: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};

export default connect(
  null,
  { register, setAlert }
)(Register);
