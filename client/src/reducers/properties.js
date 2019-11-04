import { PromiseProvider } from "mongoose";
import { PROPERTY_CREATE_SUCCESS } from "../actions/types";

const initialState = {
  propertiers: [],
  currentProperty: null
};

export default function(state = initialState, action) {
  const { payload, type } = action;

  switch (type) {
    case PROPERTY_CREATE_SUCCESS:
      return {
        ...state,
        currentProperty: payload
      };
    default: 
      return state
  }
}
