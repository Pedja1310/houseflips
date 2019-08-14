import axios from "axios";
import { setAlert } from "./alerts";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  SET_ALERT,
  LOGIN_SUCCESS
} from "./types";

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
