import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_FAIL, LOGIN_SUCCESS, LOAD_USER, LOGOUT_USER } from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: false,
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
    case LOGOUT_USER:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null
      };
    default:
      return state;
  }
}
