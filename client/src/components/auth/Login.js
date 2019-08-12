import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Form = styled.form`
  margin: 4rem auto;
  width: 50%;
  background: #fff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  box-shadow: 1px 0px 34px 5px rgba(0, 0, 0, 0.26);
`;

const Headline = styled.div`
  padding: 1rem;
  color: #747d8c;
`;

const InputField = styled.div`
  width: 90%;
  margin: 0 auto;

  & label {
    display: flex;
    flex-direction: column;
  }

  & input {
    height: 2.5rem;
    margin: 0.5rem 0;
    border: none;
    border-bottom: 1px solid #2f3542;

    &:active,
    &:focus {
      outline: none;
    }
  }
`;

const ButtonSection = styled.div`
  margin: 1rem auto 1.5rem auto;
  width: 90%;
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  flex: 0 0 40%;
  height: 3rem;
  border: 1px solid #747d8c;
  border-radius: 5px;
  color: #57606f;
  background: #f1f2f6;

  &:hover {
    background: #57606f;
    color: #f1f2f6;
  }
`;

const LoginRedirect = styled(Link)`
  font-size: 1.1rem;
  font-weight: 500;
  color: #57a0ff;
  justify-content: flex-end;
  margin-left: auto;

  &:hover {
    text-decoration: none;
    color: #57a0ff;
  }
`;

const Login = props => {
  // const [formState, setFormState] = useState({
  //   email: "",
  //   password: ""
  // });

  // const { email, password } = formState;

  // const handleChange = e => {
  //   setFormState({ ...formState, [e.target.name]: e.target.value });
  // };

  // const handleSubmit = e => {
  //   e.preventDefault();

  //   if (password !== password2) {
  //     setAlert("Please enter matching passwords", "danger");
  //   } else {
  //     login({ email, password });
  //   }
  // };
  return (
    <Form>
      <Headline>
        <h3>Login</h3>
      </Headline>

      <InputField>
        <label htmlFor="email">
          <input type="email" name="email" id="email" placeholder="Email" />
        </label>
      </InputField>
      <InputField>
        <label htmlFor="password">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
        </label>
      </InputField>

      <ButtonSection>
        <Button type="submit">Login</Button>
        <LoginRedirect to="/login">Can't remember password?</LoginRedirect>
      </ButtonSection>
    </Form>
  );
};

// Register.propTypes = {
//   login: PropTypes.func.isRequired,
//   setAlert: PropTypes.func.isRequired
// };

// const mapStateToProps = state => ({
//   isAuthenticated: state.isAuthenticated
// });

export default connect(
  null,
  {}
)(Login);
