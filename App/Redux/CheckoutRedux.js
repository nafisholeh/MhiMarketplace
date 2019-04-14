import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { createSelector } from 'reselect';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  selectPayment: ['paymentSelected'],
  storeCheckoutId: ['checkoutId'],
})

export const CheckoutTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  paymentSelected: null,
  checkoutId: null,
})

/* ------------- Selectors ------------- */

export const checkoutSelectors = () => state => state.checkout

export const getPaymentOptSelected = () =>
  createSelector(checkoutSelectors(), state => state.paymentSelected)
  
export const getCheckoutId = () =>
  createSelector(checkoutSelectors(), state => state.checkoutId)

/* ------------- Reducers ------------- */

export const selectPayment = (state, { paymentSelected }) =>
  state.merge({ paymentSelected })
  
export const storeCheckoutId = (state, { checkoutId }) =>
  state.merge({ checkoutId })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SELECT_PAYMENT]: selectPayment,
  [Types.STORE_CHECKOUT_ID]: storeCheckoutId,
})
