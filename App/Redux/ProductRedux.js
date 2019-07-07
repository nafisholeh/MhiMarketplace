import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { createSelector } from 'reselect';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  storeEditedProduct: ['editedProduct'],
  selectCategory: ['category_id', 'category_title'],
})

export const ProductTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  editedProduct: null,
  category_id: null,
  category_title: null,
})

/* ------------- Selectors ------------- */

export const productSelectors = () => state => state.product

export const getEditedProduct = () =>
  createSelector(productSelectors(), state => state.editedProduct || '0')
  
export const getProductCategory = () =>
  createSelector(productSelectors(), state => state.category_id || null)

export const getProductTitle = () =>
  createSelector(productSelectors(), state => state.category_title || null)

/* ------------- Reducers ------------- */

export const storeEditedProduct = (state, { editedProduct }) =>
  state.merge({ editedProduct })

export const selectCategory = (state, { category_id, category_title }) =>
  state.merge({ category_id, category_title })
  
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.STORE_EDITED_PRODUCT]: storeEditedProduct,
  [Types.SELECT_CATEGORY]: selectCategory,
})
