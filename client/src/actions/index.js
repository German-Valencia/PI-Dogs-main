import axios from "axios";

export const GET_DOGS = "GET_DOGS";
export const CLEAN_DOGS = "CLEAN_DOGS";

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

export function cleanDogs(dispatch) {
  return dispatch({
    type: CLEAN_DOGS,
    payload: [],
  });
}
