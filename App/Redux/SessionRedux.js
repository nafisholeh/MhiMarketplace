import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

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

export const SessionSelectors = {
  getUser: state => state.session.user
}

/* ------------- Reducers ------------- */

// store user session related data
export const storeSession = (state, { user }) => {
  console.log('storeSession redux ', state, user)
  return state.merge({ user });
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.STORE_SESSION]: storeSession
})
