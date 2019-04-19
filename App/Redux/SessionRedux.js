import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { createSelector } from 'reselect'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  reset: null,
  storeSession: ['user'],  
})

export const SessionTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  user: undefined,
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
      const { user } = state;
      if (!user) return null;
      const { _id } = user;
      return _id ? _id : null;
    }
  )
  
export const isAdmin = () =>
  createSelector(
    sessionSelectors(),
    state => {
      const { user } = state;
      if (!user) return false;
      const { user_type } = user;
      if (user_type && user_type !== 'user') return true;
      return false;
    }
  )
  
export const isStokOpname = () =>
  createSelector(
    sessionSelectors(),
    state => {
      const { user } = state;
      if (!user) return false;
      const { user_type } = user;
      if (user_type && user_type === 'stok opname') return true;
      return false;
    }
  )

/* ------------- Reducers ------------- */

export const reset = state => INITIAL_STATE

// store user session related data
export const storeSession = (state, { user }) => state.merge({ user })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RESET]: reset,
  [Types.STORE_SESSION]: storeSession
})
