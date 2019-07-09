import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { createSelector } from 'reselect';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  resetCheckout: null,
  selectPayment: ['paymentSelected'],
  storeCheckoutId: ['checkoutId'],
  updatePaymentDetails: ['gross', 'discount', 'courier', 'total'],
  storeOpenedOrder: ['checkoutId', 'name', 'paid_off'], 
  storeShipmentDate: ['shipment_date'],
  storeShipmentTime: ['shipment_time'],
  selectShipmentAddress: ['shipment_address'],
})

export const CheckoutTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  paymentSelected: null,
  checkoutId: null,
  checkoutName: null,
  checkoutConfirmed: null,
  gross: 0,
  discount: 0,
  courier: 0,
  total: 0,
  shipment_date: null,
  shipment_time: null,
  shipment_address: null,
})

/* ------------- Selectors ------------- */

export const checkoutSelectors = () => state => state.checkout

export const getPaymentOptSelected = () =>
  createSelector(checkoutSelectors(), state => state.paymentSelected)
  
export const getCheckoutId = () =>
  createSelector(checkoutSelectors(), state => state.checkoutId)

export const getCheckoutName = () =>
  createSelector(checkoutSelectors(), state => state.checkoutName || '')

export const getCheckoutStatus = () =>
  createSelector(checkoutSelectors(), state => state.checkoutConfirmed)

export const getPaymentDetails = () =>
  createSelector(checkoutSelectors(), state => ({
    gross: state.gross, 
    discount: state.discount, 
    courier: state.courier, 
    total: state.total, 
  }))
  
export const isShipmentSelected = () => 
  createSelector(checkoutSelectors(), state => {
    const { shipment_date } = state;
    if (!shipment_date) return false;
    for (const key of Object.keys(shipment_date)) {
      const { selected } = shipment_date[key];
      if (selected) return true;
    }
    return false;
  })

export const getChosenShipment = () =>
  createSelector(checkoutSelectors(), state => {
    const { shipment_date, shipment_time } = state;
    if (!shipment_date || !shipment_time) return;
    const [ time_start, time_end ] = shipment_time.split(',');
    let shipmentDate = [];
    for (const key of Object.keys(shipment_date)) {
      const { selected } = shipment_date[key];
      if (selected) {
        shipmentDate.push({
          date: key,
          time_start,
          time_end,
        });  
      }
    }
    return shipmentDate;
  })
  
export const getSelectedShipmentAddress = () => 
  createSelector(checkoutSelectors(), state => {
    const { shipment_address } = state;
    return shipment_address;
  })

/* ------------- Reducers ------------- */

export const resetCheckout = (state) => INITIAL_STATE

export const selectPayment = (state, { paymentSelected }) =>
  state.merge({ paymentSelected })
  
export const storeCheckoutId = (state, { checkoutId }) =>
  state.merge({ checkoutId })
  
export const updatePaymentDetails = (state, { gross, discount, courier, total }) =>
  state.merge({
    gross, discount, courier, total
  })
  
export const storeOpenedOrder = (state, { checkoutId, name, paid_off }) =>
  state.merge({
    checkoutId, checkoutName: name, checkoutConfirmed: paid_off  
  })

export const storeShipmentDate = (state, { shipment_date }) =>
  state.merge({ shipment_date })

export const storeShipmentTime = (state, { shipment_time }) =>
  state.merge({ shipment_time })
  
export const selectShipmentAddress = (state, { shipment_address }) =>
  state.merge({ shipment_address })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SELECT_PAYMENT]: selectPayment,
  [Types.STORE_CHECKOUT_ID]: storeCheckoutId,
  [Types.UPDATE_PAYMENT_DETAILS]: updatePaymentDetails,
  [Types.STORE_OPENED_ORDER]: storeOpenedOrder,
  [Types.STORE_SHIPMENT_DATE]: storeShipmentDate,
  [Types.STORE_SHIPMENT_TIME]: storeShipmentTime,
  [Types.SELECT_SHIPMENT_ADDRESS]: selectShipmentAddress,
})
