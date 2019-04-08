import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { createSelector } from 'reselect';

import ApolloClientProvider from 'Services/ApolloClientProvider';
import { FETCH_CART } from 'GraphQL/Cart/Query';
import { store } from 'Containers/App';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  fetchCart: null,
  storeCart: ['cart'],
})

export const CartTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  cart: null,
})

/* ------------- Selectors ------------- */

export const cartSelectors = () => state => state.cart

export const getCartItemIds = () =>
  createSelector(
    cartSelectors(),
    state => {
      const { cart } = state;
      if (!cart) return [];
      return cart.map(item => item.product._id);
    }
  )

/* ------------- Reducers ------------- */

export const fetchCart = (state) => {
  const { session: { user } } = store.getState();
  if (!user) return state;
  const { _id } = user;
  ApolloClientProvider.client.query({
    query: FETCH_CART,
    variables: { user_id: _id }
  })
  .then(data => {})
  .catch(err => {})
  return state;
}

export const storeCart = (state, { cart }) => {
  if (cart) {
    const { products } = cart;
    return state.merge({ cart: products });
  }
  return state.merge({ cart });
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_CART]: fetchCart,
  [Types.STORE_CART]: storeCart,
})
