import axios from "axios";

export const GET_DOGS = "GET_DOGS";
export const CLEAN_DOGS = "CLEAN_DOGS";
export const GET_DOGS_BY_NAME = "GET_DOGS_BY_NAME";
export const GET_ALL_TEMPERAMENTS = "GET_ALL_TEMPERAMENTS";
export const FILTER_CREATED = "FILTER_CREATED";
export const ORDER_NAME = "ORDER_NAME";
export const FILTER_TEMPERAMENT = "FILTER_TEMPERAMENT";
export const ORDER_WEIGHT = "ORDER_WEIGHT";
export const GET_DETAILS = "GET_DETAILS";
export const CLEAN_DETAIL = "CLEAN_DETAIL";
export const POST_POKEMON = "POST_POKEMON"

export function getDogs() {
  return async function (dispatch) {
    try {
      const json = await axios.get("http://localhost:3001/dogs");
      return dispatch({
        type: GET_DOGS,
        payload: json.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function getDogsByName(payload) {
  return async (dispatch) => {
    try {
      const json = await axios.get(
        `http://localhost:3001/pokemons?name=${payload}`
      );
      return dispatch({
        type: GET_DOGS_BY_NAME,
        payload: json.data,
      });
    } catch (e) {
      alert("Dog not found");
      window.location.href = "http://localhost:3000/home";
      console.log(e);
    }
  };
}

export function getAllTemperaments() {
  return async (dispatch) => {
    try {
      const json = await axios.get("http://localhost:3001/temperaments");
      return dispatch({
        type: GET_ALL_TEMPERAMENTS,
        payload: json.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function filterCreated(payload) {
  return {
    type: FILTER_CREATED,
    payload,
  };
}

export function orderName(payload) {
  return {
    type: ORDER_NAME,
    payload,
  };
}

export function filterTemperament(payload) {
  return {
    type: FILTER_TEMPERAMENT,
    payload,
  };
}

export function orderWeight(payload) {
  return {
    type: ORDER_WEIGHT,
    payload,
  };
}

export function cleanDogs(dispatch) {
  return dispatch({
    type: CLEAN_DOGS,
    payload: [],
  });
}

export function getDetail(id) {
  return async (dispatch) => {
    try {
      const json = await axios.get(`http://localhost:3001/dogs/${id}`);
      return dispatch({
        type: GET_DETAILS,
        payload: json.data,
      });
    } catch (error) {}
  };
}

export function cleanDetail(dispatch) {
  return dispatch({
    type: CLEAN_DETAIL,
    payload: [],
  });
}

export function posDog(payload) {
  return async () => {
    try {
      const createDog = await axios.post("http://localhost:3001/dogs", payload);
      alert("New dog is created!");
      return createDog;
    } catch (e) {
      alert("Dog name already exist");
      console.log(e);
    }
  };
}
