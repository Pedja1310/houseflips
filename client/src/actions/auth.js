import axios from "axios";
import { setAlert } from "./alerts";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOAD_USER,
  LOGOUT_USER,
  LOGIN_SUCCESS
} from "./types";
import setAuthToken from "../utils/setAuthToken";

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth");
    console.log(res);

    dispatch({
      type: LOAD_USER,
      payload: res.data
    });
  } catch (ex) {
    const error = ex.response.data;
    console.log(error);

    if (error) {
      error.forEach(err => dispatch(setAlert(err.msg, "danger")));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      "content-type": "application/json"
    }
  };
  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post("/api/users", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  } catch (ex) {
    console.log(ex);
    const error = ex.response.data;

    if (error) {
      error.forEach(err => dispatch(setAlert(err.msg, "danger")));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

export const login = ({ email, password }) => async dispatch => {
  const config = {
    headers: {
      "content-type": "application/json"
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/auth", body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (ex) {
    console.log(ex);
    const error = ex.response.data;

    if (error) {
      error.forEach(err => dispatch(setAlert(err.msg, "danger")));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT_USER
  });
};
