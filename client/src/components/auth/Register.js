import React, { useState } from "react";
import { register } from "../../actions/auth";
import setAlert from "../../actions/alert";

const Register = props => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  const { name, email, password, password2 } = formState;

  const handleChange = e => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    console.log(formState);
  };

  const onSubmit = e => {
    e.preventDefault();

    if (password !== password2) {
      console.log("Please enter matching passwords", "danger");
    } else {
      register({ name, email, password });
    }
  };

  return (
    <div className="w-full max-w-xs">
      <form
        onSubmit={e => onSubmit(e)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Name
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              name="name"
              onChange={e => handleChange(e)}
              value={name}
            />
          </label>
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
            <input
              type="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              onChange={e => handleChange(e)}
              value={email}
            />
          </label>
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
            <input
              type="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              onChange={e => handleChange(e)}
              value={password}
            />
          </label>
        </div>
        <div className="mb-4">
          <label
            htmlFor="password2"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Confirm Password
            <input
              type="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password2"
              name="password2"
              onChange={e => handleChange(e)}
              vaule={password2}
            />
          </label>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
};

export default Register;
