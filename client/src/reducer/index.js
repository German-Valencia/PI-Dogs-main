import { GET_DOGS, CLEAN_DOGS } from "../actions";

const initialState = {
  dogs: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_DOGS:
      return {
        ...state,
        dogs: payload,
      };
    case CLEAN_DOGS:
      return {
        ...state,
        dogs: payload,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
