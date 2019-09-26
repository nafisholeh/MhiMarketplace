import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { createSelector } from 'reselect';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  storeFarmerCreds: ['phone', 'email', 'password'],
  storeFarmerKtp: ['ktp'],
  storeFarmerArea: ['area'],
})

export const FarmerSignupTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  phone: null,
  email: null,
  password: null,
  ktp: null,
  area: [],
})

/* ------------- Selectors ------------- */

export const farmerSignupSelectors = () => state => state.farmerSignup

export const getArea = () =>
  createSelector(farmerSignupSelectors(), state => state.area || [])

/* ------------- Reducers ------------- */

export const storeFarmerCreds = (state, { phone, email, password }) =>
  state.merge({ phone, email, password })
  
export const storeFarmerKtp = (state, { ktp }) =>
  state.merge({ ktp })
  
export const storeFarmerArea = (state, { area: newArea }) => {
  const currentArea = state.area || [];
  const updatedArea = currentArea.concat([newArea]);
  return state.merge({ area: updatedArea })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.STORE_FARMER_CREDS]: storeFarmerCreds,
  [Types.STORE_FARMER_KTP]: storeFarmerKtp,
  [Types.STORE_FARMER_AREA]: storeFarmerArea,
})
