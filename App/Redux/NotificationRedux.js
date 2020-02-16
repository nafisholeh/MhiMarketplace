import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";
import { createSelector } from "reselect";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  resetNotification: null,
  selectNotification: ["selectedNotification"]
});

export const NotificationTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  selectedNotification: null
});

/* ------------- Selectors ------------- */

export const notifSelectors = () => state => state.notification;

export const getSelectedNotification = () =>
  createSelector(notifSelectors(), state => state.selectedNotification);

/* ------------- Reducers ------------- */

export const resetNotification = state => INITIAL_STATE;

export const selectNotification = (state, { selectedNotification }) =>
  state.merge({ selectedNotification });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RESET_NOTIFICATION]: resetNotification,
  [Types.SELECT_NOTIFICATION]: selectNotification
});
