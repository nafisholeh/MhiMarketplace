import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { createSelector } from 'reselect';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  storeEditedProduct: ['editedProduct']
})

export const ProductTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  editedProduct: null,
})

/* ------------- Selectors ------------- */

export const productSelectors = () => state => state.product

export const getEditedProduct = () =>
  createSelector(productSelectors(), state => state.editedProduct)

/* ------------- Reducers ------------- */

export const storeEditedProduct = (state, { editedProduct }) =>
  state.merge({ editedProduct })
  
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.STORE_EDITED_PRODUCT]: storeEditedProduct,
})
