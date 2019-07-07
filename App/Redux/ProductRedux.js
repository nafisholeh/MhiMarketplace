import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { createSelector } from 'reselect';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  storeEditedProduct: ['editedProduct'],
  selectCategory: ['category_id', 'category_title'],
  filterByTerm: ['term'],
  selectSendingItem: ['is_sending_item'],
})

export const ProductTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  editedProduct: null,
  category_id: null,
  category_title: null,
  term: null,
  is_sending_item: false,
})

/* ------------- Selectors ------------- */

export const productSelectors = () => state => state.product

export const getEditedProduct = () =>
  createSelector(productSelectors(), state => state.editedProduct || '0')
  
export const getProductCategory = () =>
  createSelector(productSelectors(), state => state.category_id || null)

export const getProductTitle = () =>
  createSelector(productSelectors(), state => state.category_title || null)

export const getTermFilter = () =>
  createSelector(productSelectors(), state => state.term || null)
  
export const isSendingOrder = () =>
  createSelector(productSelectors(), state => state.is_sending_item || null)

/* ------------- Reducers ------------- */

export const storeEditedProduct = (state, { editedProduct }) =>
  state.merge({ editedProduct })

export const selectCategory = (state, { category_id, category_title }) =>
  state.merge({ category_id, category_title })

export const filterByTerm = (state, { term }) =>
  state.merge({ term })
  
export const selectSendingItem = (state, { is_sending_item }) =>
  state.merge({ is_sending_item })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.STORE_EDITED_PRODUCT]: storeEditedProduct,
  [Types.SELECT_CATEGORY]: selectCategory,
  [Types.FILTER_BY_TERM]: filterByTerm,
  [Types.SELECT_SENDING_ITEM]: selectSendingItem,
})
