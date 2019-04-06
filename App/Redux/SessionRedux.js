import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { createSelector } from 'reselect'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  storeSession: ['user'],  
})

export const SessionTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  user: null,
})

/* ------------- Selectors ------------- */

export const sessionSelectors = () => state => state.session

export const getUser = () => 
  createSelector(
    sessionSelectors(),
    state => state.user
  )

export const getUserId = () => 
  createSelector(
    sessionSelectors(),
    state => {
      const { _id } = state.user;
      return _id ? _id : null;
    }
  )

/* ------------- Reducers ------------- */

// store user session related data
export const storeSession = (state, { user }) => state.merge({ user })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.STORE_SESSION]: storeSession
})
