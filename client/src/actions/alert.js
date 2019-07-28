import uuidv4 from 'uuid/v4'

import {
  SET_ALERT,
  REMOVE_ALERT 
} from './types'

const setAlert = (msg, type, timeout = 3000) => dispatch => {
  const id = uuidv4();

  dispatch({
    type: SET_ALERT,
    payload: { msg, type, id }
  });

  setTimeout(() => dispatch({
    type: REMOVE_ALERT,
    payload: { id }
  }), timeout)
} 

export default setAlert;