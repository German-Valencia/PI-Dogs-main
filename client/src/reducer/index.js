import {
  GET_DOGS,
  CLEAN_DOGS,
  GET_DOGS_BY_NAME,
  GET_ALL_TEMPERAMENTS,
  FILTER_CREATED,
  ORDER_NAME,
  FILTER_TEMPERAMENT,
  ORDER_WEIGHT,
  POST_DOG,
  GET_DETAILS,
  CLEAN_DETAILS,
} from "../actions";

const initialState = {
  dogs: [],
  allDogs: [],
  temperaments: [],
  dogDetail: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_DOGS:
      return {
        ...state,
        dogs: payload,
        allDogs: payload,
      };
    case GET_DOGS_BY_NAME:
      return {
        ...state,
        dogs: payload,
      };
    case CLEAN_DOGS:
      return {
        ...state,
        dogs: payload,
      };
    case GET_ALL_TEMPERAMENTS:
      return {
        ...state,
        temperaments: payload,
      };
    case FILTER_CREATED:
      let copy = state.allDogs;
      let createdFiltered;
      if (payload === "created") {
        createdFiltered = copy.filter((e) => e.createInDb);
      } else if (payload === "api") {
        createdFiltered = copy.filter((e) => !e.createInDb);
      } else {
        createdFiltered = copy;
      }
      return {
        ...state,
        dogs: createdFiltered,
      };
    case FILTER_TEMPERAMENT:
      let copy2 = state.allDogs;
      let temperamentFiltered =
        payload === "all"
          ? copy2
          : copy2.filter((e) => e.temperaments.some((e) => e.name === payload));
      if (temperamentFiltered.length <= 0) {
        temperamentFiltered = copy2;
        alert("There are no dog of indicated temperament");
      }
      return {
        ...state,
        dogs: temperamentFiltered,
      };
    case ORDER_NAME:
      let copy3 = state.dogs;
      let sortedName =
        payload === "asc"
          ? copy3.sort((a, b) => {
              return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
            })
          : copy3.sort((a, b) => {
              return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
            });
      return {
        ...state,
        dogs: sortedName,
      };
    case ORDER_WEIGHT:
      let copy4 = state.dogs;
      let sortedWeight =
        payload === "asc"
          ? copy4.sort((a, b) => a.weight - b.weight)
          : copy4.sort((a, b) => b.weight - a.weight);
      return {
        ...state,
        dogs: sortedWeight,
      };
    case GET_DETAILS:
      return {
        ...state,
        dogDetail: payload,
      };
    case CLEAN_DETAILS:
      return {
        ...state,
        dogDetail: payload,
      };
    case POST_DOG:
      return {
        ...state,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
