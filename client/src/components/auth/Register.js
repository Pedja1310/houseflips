import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from 'styled-components';
import { register } from "../../actions/auth";
import { setAlert } from "../../actions/alerts";
import { Link, Redirect } from 'react-router-dom';

const Form = styled.form`
  margin: 4rem auto;
  padding: 2rem;
  width: 50%;
  background: ${props => props.theme.white};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  box-shadow: 1px 0px 34px 5px rgba(0,0,0,0.26);
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
    margin: .5rem 0;
    border: none;
    border-bottom: 1px solid ${props => props.theme.grey3};;
    color: ${props => props.theme.darkGrey};
    font-weight: 400;


    &:active,
    &:focus {
      outline: none;
    }
  }
`;

const ButtonSection = styled.div`
  margin: 1.5rem auto 1rem auto;
  width: 100%; 
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  flex: 0 0 40%;
  height: 3rem; 
  border: 1px solid ${props => props.theme.darkGrey};
  border-radius: 5px;
  color: ${props => props.theme.darkGrey};
  background: ${props => props.theme.white};
  
  &:hover {
    background: ${props => props.theme.darkGrey};
    color: ${props => props.theme.white};
  }
`;

const LoginRedirect = styled(Link)`
  font-size: 1.1rem;
  font-weight: 500;
  color: ${props => props.theme.red1};
  justify-content: flex-end;
  margin-left: auto;

  &:hover {
    text-decoration: none;
    color: ${props => props.theme.red1};
  }
`;

const Register = ({ register, setAlert, isAuthenticated, user }) => {
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

  const handleSubmit = e => {
    e.preventDefault();

    if (password !== password2) {
      setAlert("Please enter matching passwords", "danger");
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated && user) {
    return <Redirect to="/portfolio" />;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Headline>
        <h2>
          Create new account
        </h2>
      </Headline>

      <InputField>
        <label htmlFor="name">
          <input type="text" name="name" id="name" placeholder="Name" onChange={handleChange} autoComplete="off" />
        </label>
      </InputField>
      <InputField>
        <label htmlFor="email">
          <input type="email" name="email" id="email" placeholder="Email" onChange={handleChange} autoComplete="off" />
        </label>
      </InputField>
      <InputField>
        <label htmlFor="password">
          <input type="password" name="password" id="password1" placeholder="Password" onChange={handleChange} />
        </label>
      </InputField>
      <InputField>
        <label htmlFor="password">
          <input type="password" name="password2" id="password2" placeholder="Confirm password" onChange={handleChange} />
        </label>
      </InputField>
      <ButtonSection>
        <Button type="submit">Register</Button>
        <LoginRedirect to="/login">Already registered?</LoginRedirect>
      </ButtonSection>
    </Form>
  );
};

Register.propType = {
  register: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { register, setAlert }
)(Register);
