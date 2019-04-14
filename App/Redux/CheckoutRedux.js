import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { createSelector } from 'reselect';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  selectPayment: ['paymentSelected'],
  storeCheckoutId: ['checkoutId'],
  updatePaymentDetails: ['gross', 'discount', 'courier', 'total'],
})

export const CheckoutTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  paymentSelected: null,
  checkoutId: null,
  gross: 0,
  discount: 0,
  courier: 0,
  total: 0
})

/* ------------- Selectors ------------- */

export const checkoutSelectors = () => state => state.checkout

export const getPaymentOptSelected = () =>
  createSelector(checkoutSelectors(), state => state.paymentSelected)
  
export const getCheckoutId = () =>
  createSelector(checkoutSelectors(), state => state.checkoutId)

export const getPaymentDetails = () =>
  createSelector(checkoutSelectors(), state => ({
    gross: state.gross, 
    discount: state.discount, 
    courier: state.courier, 
    total: state.total, 
  }))

/* ------------- Reducers ------------- */

export const selectPayment = (state, { paymentSelected }) =>
  state.merge({ paymentSelected })
  
export const storeCheckoutId = (state, { checkoutId }) =>
  state.merge({ checkoutId })
  
export const updatePaymentDetails = (state, { gross, discount, courier, total }) =>
  state.merge({
    gross, discount, courier, total
  })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SELECT_PAYMENT]: selectPayment,
  [Types.STORE_CHECKOUT_ID]: storeCheckoutId,
  [Types.UPDATE_PAYMENT_DETAILS]: updatePaymentDetails
})
