import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { createSelector } from 'reselect';
import { update } from 'immutability-helper';

import ApolloClientProvider from 'Services/ApolloClientProvider';
import { FETCH_CART } from 'GraphQL/Cart/Query';
import { store } from 'Containers/App';
import { calcDiscount } from 'Lib';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  fetchCart: null,
  storeCart: ['cart'],
  updateCart: ['product_id', 'qty'],
  toggleSelectItem: ['product_id', 'status'],
})

export const CartTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  cart: null,
  selected: [],
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
  
export const getCartTotalGrossPrice = () =>
  createSelector(
    cartSelectors(),
    state => {
      const { cart } = state;
      if (!cart) return [];
      const totalPrice = cart.reduce((total, n) => {
        const prices = n.product.discount ? calcDiscount(n.product.price, n.product.discount) : n.product.price;
        const temp = total + (prices * n.qty);
        return temp;
      }, 0);
      return totalPrice;
    }
  )
  
export const getCartItemSelected = () => {
  createSelector(
    cartSelectors(),
    state => {
      const { selected } = state;
      return selected;
    }
  )
}

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
  return state.merge({ cart });
}

export const updateCart = (state, { product_id, qty }) => {
  const cart = state.cart;
  const updateIndex = cart.findIndex(n => n.product._id === product_id);
  const newCart = update(
    cart, 
    {  
      [updateIndex]: {
        $merge: { qty: qty }
      }
    }
  );
  return state.merge({ 
    cart: update( cart, newCart ) 
  });
}

export const toggleSelectItem = (state, { product_id, status = true }) => {
  const { selected } = state;
  const isExist = selected.indexOf(product_id) > -1;
  if (status && !isExist) {
    return state.merge({
      selected: [ ...selected, product_id ]
    });
  } 
  if (!status && isExist){
    const removedIndex = selected.indexOf(product_id);
    return state.merge({
      selected: [
        ...state.selected.slice(0, removedIndex),
        ...state.selected.slice(removedIndex + 1)
      ]
    });
  }
  return state;
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_CART]: fetchCart,
  [Types.STORE_CART]: storeCart,
  [Types.UPDATE_CART]: updateCart,
  [Types.TOGGLE_SELECT_ITEM]: toggleSelectItem,  
})
