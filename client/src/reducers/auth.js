import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_FAIL, LOGIN_SUCCESS, LOAD_USER } from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
  user: null
};

export default function(state = initialState, action) {
  const { payload, type } = action;

  switch (type) {
    case LOAD_USER: 
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      }
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
      localStorage.removeItem("token");
      return {
        isAuthenticated: false,
        loading: false,
        user: null
      };
    default:
      return state;
  }
}
