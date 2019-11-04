import { combineReducers } from "redux";
import alerts from "./alerts";
import auth from "./auth";
import properties from "./properties";

export default combineReducers({
  alerts,
  auth,
  properties
});
