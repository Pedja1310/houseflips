import uuidv4 from "uuid/v4";

import { SET_ALERT, REMOVE_ALERT } from "./types";

export const setAlert = (msg, type, timeout = 5000) => async dispatch => {
  const id = uuidv4();

  dispatch({
    type: SET_ALERT,
    payload: { msg, type, id }
  });

  setTimeout(
    () =>
      dispatch({
        type: REMOVE_ALERT,
        payload: { id }
      }),
    timeout
  );
};
