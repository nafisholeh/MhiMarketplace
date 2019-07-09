import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { createSelector } from 'reselect';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  startup: ['startedup'],
})

export const StartupTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  startedup: false,
})

/* ------------- Selectors ------------- */

export const startupSelectors = () => state => state.startup

export const isRehydrated = () => 
  createSelector(
    startupSelectors(),
    state => state.startedup
  )

/* ------------- Reducers ------------- */

export const startup = (state) => state.merge({ startedup: true })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.STARTUP]: startup,
})
