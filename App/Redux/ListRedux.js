import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { createSelector } from 'reselect';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  resetList: null,
  selectListItem: ['selectedId'],
})

export const ListTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  selectedId: null,
})

/* ------------- Selectors ------------- */

export const listSelectors = () => state => state.list

export const getSelectedListId = () =>
  createSelector(listSelectors(), state => state.selectedId)

/* ------------- Reducers ------------- */

export const resetList = (state) => INITIAL_STATE

export const selectListItem = (state, { selectedId }) =>
  state.merge({ selectedId })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SELECT_LIST_ITEM]: selectListItem,
})
