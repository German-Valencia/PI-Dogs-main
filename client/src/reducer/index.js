import {
  GET_DOGS,
  GET_DOGS_BY_NAME,
  CLEAN_DOGS,
  GET_ALL_TEMPERAMENTS,
  FILTER_CREATED,
  FILTER_TEMPERAMENT,
  ORDER_NAME,
  ORDER_WEIGHT,
  GET_DETAILS,
  CLEAN_DETAIL,
  POST_DOG,
} from "../actions";

const initialState = {
  dogs: [],
  temperaments: [],
  dogDetail: [],
  allDogs: [],
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
        createdFiltered = copy.filter((e) => e.createdInDb);
      } else if (payload === "api") {
        createdFiltered = copy.filter((e) => !e.createdInDb);
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
          : copy2.filter((e) => {
              if (e.temperament) {
                if (e.temperament.includes(payload)) {
                  return e;
                }
              }
              return false;
            });
      if (temperamentFiltered.length <= 0) {
        temperamentFiltered = copy2;
        alert("There are no dog of indicated temperament");
      }
      return {
        ...state,
        dogs: temperamentFiltered,
      };
    case ORDER_NAME:
      let copy3 = state.allDogs;
      let sortedName =
        payload === "asc"
          ? copy3.sort((a, b) => {
              return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
            })
          : copy3.sort((a, b) => {
              return a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1;
            });
      return {
        ...state,
        dogs: sortedName,
      };
    case ORDER_WEIGHT:
      let copy4 = state.allDogs;
      let sortedWeight =
        payload === "asc"
          ? copy4.sort((a, b) => {
              let pesoA = parseInt(a.weight.split("-")[0]);
              let pesoB = parseInt(b.weight.split("-")[0]);
              if (pesoA > pesoB) return 1;
              if (pesoA < pesoB) return -1;
              else return 0;
            })
          : copy4.sort((a, b) => {
              let pesoA = parseInt(a.weight.split("-")[0]);
              let pesoB = parseInt(b.weight.split("-")[0]);
              if (pesoA < pesoB) return 1;
              if (pesoA > pesoB) return -1;
              else return 0;
            });
      return {
        ...state,
        dogs: sortedWeight,
      };
    case GET_DETAILS:
      return {
        ...state,
        dogDetail: payload,
      };
    case CLEAN_DETAIL:
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
