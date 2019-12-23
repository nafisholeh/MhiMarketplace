import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { createSelector } from 'reselect'

import Config from 'Config/AppConfig';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  reset: null,
  storeSession: ['user'],
  storeSignupEmail: ['email'],
  storeSubAppSession: ['subAppSession']
})

export const SessionTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  user: undefined,
  signupEmail: null,
  subAppSession: 'user',
})

/* ------------- Selectors ------------- */

export const sessionSelectors = () => state => state.session

export const getUser = () => 
  createSelector(
    sessionSelectors(),
    state => state.user
  )
  
export const getMockUserId = () => 
  createSelector(
    sessionSelectors(),
    state => {
      return "5d93631029c05f7a60f247a5";
    }
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

export const getUserPhoto = () => 
  createSelector(
    sessionSelectors(),
    state => {
      const { user } = state;
      if (!user) return null;
      const { ktp_photo_face } = user;
      return ktp_photo_face ? ktp_photo_face : null;
    }
  )
  
export const isAdmin = () =>
  createSelector(
    sessionSelectors(),
    state => {
      const { user } = state;
      if (!user) return false;
      const { user_type } = user;
      if (user_type && user_type === Config.userType.ADMIN) return true;
      return false;
    }
  )
  
export const isReseller = () =>
  createSelector(
    sessionSelectors(),
    state => {
      const { user } = state;
      if (!user) return false;
      const { user_type } = user;
      if (user_type && user_type === Config.userType.RESELLER) return true;
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
      if (user_type && user_type === Config.userType.STOK_OPNAME) return true;
      return false;
    }
  )
  
export const isKeuangan = () =>
  createSelector(
    sessionSelectors(),
    state => {
      const { user } = state;
      if (!user) return false;
      const { user_type } = user;
      if (user_type && user_type === Config.userType.KEUANGAN) return true;
      return false;
    }
  )
  
export const isKurir = () =>
  createSelector(
    sessionSelectors(),
    state => {
      const { user } = state;
      if (!user) return false;
      const { user_type } = user;
      if (user_type && user_type === 'kurir') return true;
      return false;
    }
  )

export const isFarmer = () =>
  createSelector(
    sessionSelectors(),
    state => {
      const { user } = state;
      if (!user) return false;
      const { user_type } = user;
      if (user_type && user_type === Config.userType.FARMER) return true;
      return false;
    }
  )
  
export const isLoggedin = () =>
  createSelector(
    sessionSelectors(),
    state => {
      const { user } = state;
      if (!user) return false;
      return true;
    }
  )

export const getSignupEmail = () => 
  createSelector(
    sessionSelectors(),
    state => state.signupEmail
  )
  
export const getChosenSubApp = () =>
  createSelector(
    sessionSelectors(),
    state => state.subAppSession
  )

/* ------------- Reducers ------------- */

export const reset = state => INITIAL_STATE

// store user session related data
export const storeSession = (state, { user }) => state.merge({ user })

export const storeSignupEmail = (state, { email }) =>
  state.merge({ signupEmail: email })

export const storeSubAppSession = (state, { subAppSession }) =>
  state.merge({ subAppSession })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RESET]: reset,
  [Types.STORE_SESSION]: storeSession,
  [Types.STORE_SIGNUP_EMAIL]: storeSignupEmail,
  [Types.STORE_SUB_APP_SESSION]: storeSubAppSession,
})
