import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { createSelector } from 'reselect';
import update from 'immutability-helper';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  storeFarmerCreds: ['phone', 'email', 'password'],
  storeFarmerKtp: ['ktp'],
  storeFarmerArea: ['area'],
  storeFarmerType: ['area'],
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
  if (Array.isArray(currentArea)) {
    const updatedArea = currentArea.concat([newArea]);
    return state.merge({ area: updatedArea })
  }
  return state;
}

export const storeFarmerType = (state, { area }) => {
  const { type, name, date_start, date_end } = area;
  const currentArea = state.area || [];
  if (Array.isArray(currentArea) && currentArea.length > 0) {
    const updatedIndex = currentArea.length - 1;
    const lastArea = currentArea[updatedIndex];
    return state.merge({
      area: [
        ...state.area.slice(0, updatedIndex),
        Object.assign({}, lastArea, { type, name, date_start, date_end }),
        ...state.area.slice(updatedIndex + 1)
      ]
    });
  }
  return state;
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.STORE_FARMER_CREDS]: storeFarmerCreds,
  [Types.STORE_FARMER_KTP]: storeFarmerKtp,
  [Types.STORE_FARMER_AREA]: storeFarmerArea,
  [Types.STORE_FARMER_TYPE]: storeFarmerType,
})
