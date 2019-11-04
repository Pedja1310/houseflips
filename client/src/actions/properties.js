import axios from 'axios';
import { PROPERTY_CREATE_SUCCESS } from "./types";

export const createProperty = (history, newProperty) => async dispatch => {
  const config = {
    headers: {
      "content-type": "application/json"
    }
  };

  const body = JSON.stringify({...newProperty});

  try {
    const res = await axios.post('/api/properties/new', body, config);

    dispatch({
      type: PROPERTY_CREATE_SUCCESS,
      payload: res.data
    })

    history.push('/portfolio')
  } catch (e) {
    console.log(e);
  }
};
