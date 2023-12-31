import axios from "axios";
import {
  GET_DRIVER_DETAIL,
  GET_ALL_DRIVERS,
  FILTER,
  ORDER,
  SEARCH_DRIVER,
  GET_TEAMS,
  RESET,
  CLEAN_DETAIL,
} from "./actions-typer";

export const getDrivers = () => {
  return async (dispatch) => {
    let drivers = [];

    try {
      let response = (await axios.get("http://localhost:3001/drivers")).data;

      drivers.push(response);

      const finalResult = [].concat.apply([], drivers);

      return dispatch({ type: GET_ALL_DRIVERS, payload: finalResult });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getDriverDetail = (id) => {
  return async (dispatch) => {
    try {
      let response = (await axios.get(`http://localhost:3001/drivers/${id}`))
        .data;

      return dispatch({ type: GET_DRIVER_DETAIL, payload: response });
    } catch (error) {
      console.log(error);
    }
  };
};

export const cleanDetail = () => {
  return { type: CLEAN_DETAIL };
};

export const filterCards = (team) => {
  return { type: FILTER, payload: team };
};

export const orderCards = (order) => {
  return { type: ORDER, payload: order };
};

export const searchDriver = (driver) => {
  return async (dispatch) => {
    try {
      let response = (
        await axios.get(`http://localhost:3001/drivers?name.forename=${driver}`)
      ).data;
      dispatch({
        type: SEARCH_DRIVER,
        payload: response,
      });
    } catch (error) {
      alert(error.response.error);
    }
  };
};

export const getTeams = () => {
  return async (dispatch) => {
    let response = (await axios.get("http://localhost:3001/teams")).data;
    dispatch({ type: GET_TEAMS, payload: response });
  };
};

export const filterTeam = (team) => {
  return async (dispatch) => {
    try {
      dispatch({ type: FILTER_BY_TEAM, payload: team });
    } catch (error) {
      alert(error.response.error);
    }
  };
};

export const restart = () => {
  return async (dispatch) => {
    dispatch({ type: RESET });
  };
};

export const postDriver = (newDriver) => {
  return async (dispatch) => {
    try {
      await axios.post(`http://localhost:3001/drivers`, newDriver);
      console.log("driver successfully created");
    } catch (error) {
      console.log(error);
    }
  };
};
