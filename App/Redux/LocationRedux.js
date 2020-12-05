import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";
import { createSelector } from "reselect";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  resetLocation: null,
  setLocationStatus: ["status"],
});

export const LocationTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  status: null,
});

/* ------------- Selectors ------------- */

export const locationSelectors = () => (state) => state.location;

export const getLocationStatus = () =>
  createSelector(locationSelectors(), (state) => state.status);

/* ------------- Reducers ------------- */

export const resetLocation = () => INITIAL_STATE;

export const setLocationStatus = (state, { status }) => state.merge({ status });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RESET_LOCATION]: resetLocation,
  [Types.SET_LOCATION_STATUS]: setLocationStatus,
});
