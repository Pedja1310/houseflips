import axios from "axios";
import { setAlert } from "./alerts";
import { REGISTER_SUCCESS, REGISTER_FAIL, SET_ALERT } from "./types";

export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      "content-type": "application/json"
    }
  };
  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post("/api/users", body, config);

    console.log(res);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.user
    });
  } catch (error) {
    const err = error.response.data;

    if (err) {
      dispatch(setAlert(err, "danger"));
    }

    // dispatch({
    //   type: REGISTER_FAIL
    // });
  }
};
