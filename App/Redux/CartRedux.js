import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { createSelector } from 'reselect';

import ApolloClientProvider from 'Services/ApolloClientProvider';
import { FETCH_CART } from 'GraphQL/Cart/Query';
import { store } from 'Containers/App';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  fetchCart: null,
  updateCartItem: ['product_id', 'qty'],
})

export const CartTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  cart: null,
})

/* ------------- Selectors ------------- */

export const cartSelectors = () => state => state.cart

/* ------------- Reducers ------------- */

export const fetchCart = (state) => {
  const { session: { user: { _id: userId } } } = store.getState();
  ApolloClientProvider.client.query({
    query: FETCH_CART,
    variables: { user_id: userId }
  })
  .then(data => console.tron.log('fetchCart success', data))
  .catch(err => console.tron.log('fetchCart error', err))
  return state;
}

export const updateCartItem = (state, { product_id, qty }) => {
  console.log('redux updateCartItem user', state, product_id, qty);
  return state.merge({ cart: null });
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_CART]: fetchCart,
  [Types.UPDATE_CART_ITEM]: updateCartItem,
})
