import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { createSelector } from 'reselect'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  reset: null,
  storeNotifId: ['oneSignalUserId'],
})

export const OneSignalTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  oneSignalUserId: undefined,
})

/* ------------- Selectors ------------- */

export const onesignalSelectors = () => state => state.onesignal

export const getOneSignalToken = () => 
  createSelector(
    onesignalSelectors(),
    state => state.oneSignalUserId ? state.oneSignalUserId : null
  )

/* ------------- Reducers ------------- */

export const reset = state => INITIAL_STATE

export const storeNotifId = (state, { oneSignalUserId }) =>
  state.merge({ oneSignalUserId })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RESET]: reset,
  [Types.STORE_NOTIF_ID]: storeNotifId,
})
