import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { login } from '../../actions/auth';
import { setAlert } from '../../actions/alerts'
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Form = styled.form`
  margin: 4rem auto;
  padding: 2rem;
  width: 50%;
  background: #fff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  box-shadow: 1px 0px 34px 5px rgba(0, 0, 0, 0.26);
`;

const Headline = styled.div`
  color: ${props => props.theme.darkGrey};
`;

const InputField = styled.div`
  width: 100%;
  margin: 0 auto;

  & label {
    display: flex;
    flex-direction: column;
  }

  & input {
    height: 2.5rem;
    margin: 0.5rem 0;
    border: none;
    border-bottom: 1px solid ${props => props.theme.darkGrey};;

    &:active,
    &:focus {
      outline: none;
    }
  }
`;

const ButtonSection = styled.div`
  margin: 1rem auto 1.5rem auto;
  width: 100%;
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  flex: 0 0 40%;
  height: 3rem;
  border: 1px solid ${props => props.theme.darkGrey};
  border-radius: 5px;
  background: ${props => props.theme.white};
  color: ${props => props.theme.darkGrey};

  &:hover {
    background: ${props => props.theme.darkGrey};
    color: ${props => props.theme.white};
  }
`;

const LoginRedirect = styled(Link)`
  font-size: 1.1rem;
  font-weight: 500;
  color: ${props => props.theme.red1};;
  justify-content: flex-end;
  margin-left: auto;

  &:hover {
    text-decoration: none;
    color: ${props => props.theme.red1};;
  }
`;

const Login = ({ login, isAuthenticated, setAlert }) => {
  const [formState, setFormState] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formState;

  const handleChange = e => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    login({ email, password });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Headline>
        <h2>Login</h2>
      </Headline>

      <InputField>
        <label htmlFor="email">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </label>
      </InputField>
      <InputField>
        <label htmlFor="password">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={handleChange}
            required
            autoComplete="off"
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

Login.propTypes = {
  login: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth
});

export default connect(
  mapStateToProps,
  { login, setAlert }
)(Login);
