import {
  REGISTER_USER,
  LOAD_USER
} from '../actions/types.js';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  user: null
};

export default function(state = initialState, action) {
  const { payload, type } = action;

  switch(type) {
    case REGISTER_USER:
      localStorage.setItem('token', payload.token)
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload.user
      }
    default: 
      return state;
  }
}