import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { createSelector } from 'reselect';
import update from 'immutability-helper';

import ApolloClientProvider from 'Services/ApolloClientProvider';
import { FETCH_CART } from 'GraphQL/Cart/Query';
import { store } from 'Containers/App';
import { calcDiscount } from 'Lib';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  resetCart: null,
  onStartFetchingCart: null,
  onSuccessFetchingCart: null,
  onErrorFetchingCart: ['error'],
  fetchCart: null,
  storeCart: ['cart'],
  updateCartQty: ['product_id', 'qty'],
  toggleSelectItem: ['product_id', 'status'],
  deleteCartItem: ['product_id'],
})

export const CartTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  isFetching: false,
  isSuccess: null,
  errorInfo: null,
  cart: null,
  selected: [],
})

/* ------------- Selectors ------------- */

export const cartSelectors = () => state => state.cart

export const isFetchingCart = () =>
  createSelector(cartSelectors(), state => state.isFetching)

export const isFetchingCartSuccess = () =>
  createSelector(cartSelectors(), state => !state.isFetching && state.isSuccess)

export const isFetchingCartError = () =>
  createSelector(cartSelectors(), state => !state.isFetching && state.error)
  
export const isCartFilled = () =>
  createSelector(
    cartSelectors(),
    state => {
      const { cart } = state;
      if (!cart) return false;
      if (Array.isArray(cart)) {
        if (cart.length > 0) return true;
      }
      return false;
    }
  )

export const getCartItems = () =>
  createSelector(
    cartSelectors(),
    state => {
      const { cart } = state;
      if (!cart) return [];
      return cart;
    }
  )

export const getCartItemIds = () =>
  createSelector(
    cartSelectors(),
    state => {
      const { cart } = state;
      if (!cart) return [];
      return cart.map(item => {
        const { product } = item;
        if (!product) return '0';
        return product._id;
      });
    }
  )
  
export const getCartTotalGrossPrice = () =>
  createSelector(
    cartSelectors(),
    getCartItemSelected(),
    (state, selected) => {
      if (selected.length === 0) return 0;
      const totalPrice = selected.reduce((total, n) => {
        const prices = n.product.discount ? 
          calcDiscount(n.product.price, n.product.discount) : 
          n.product.price;
        return total + (prices * n.qty);
      }, 0);
      return totalPrice;
    }
  )
  
export const getCartItemSelected = () =>
  createSelector(
    cartSelectors(),
    state => {
      const { cart, selected } = state;
      if (!cart) return [];
      return cart.filter(m => selected.some(n => n === m.product._id)) || [];
    }
  )
  
export const getCartItemIdSelected = () =>
  createSelector(
    cartSelectors(),
    state => {
      const { selected } = state;
      return selected || [];
    }
  )

export const isAnyCartItemSelected = () =>
  createSelector(
    cartSelectors(),
    state => {
      const { selected = [] } = state;
      return selected.length > 0;
    }
  )

export const isCheckoutValid = () =>
  createSelector(
    cartSelectors(),
    state => {
      const { selected } = state;
      return Array.isArray(selected) && selected.length ? true : false;
    }
  )

/* ------------- Reducers ------------- */

export const resetCart = state => INITIAL_STATE

export const onStartFetchingCart = state => {
  return state.merge({ isFetching: true, isSuccess: null, errorInfo: null });
}

export const onSuccessFetchingCart = state => {
  return state.merge({ isFetching: false, isSuccess: true, errorInfo: null });
}

export const onErrorFetchingCart = (state, { error }) => {
  return state.merge({ isFetching: false, isSuccess: true, errorInfo: error });
}

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

export const updateCartQty = (state, { product_id, qty }) => {
  const cart = state.cart;
  const updateIndex = cart.findIndex(n => n.product._id === product_id);
  return state.merge({
    cart: update(cart, { [updateIndex]: { qty: { $set: qty } } })
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

export const deleteCartItem = (state, { product_id }) => {
  const { cart, selected } = state;
  const updateIndex = cart.findIndex(n => n.product._id === product_id);
  const removedSelectedIndex = selected.indexOf(product_id);
  return state.merge({ 
    cart: [
      ...cart.slice(0, updateIndex),
      ...cart.slice(updateIndex + 1)
    ],
    selected: removedSelectedIndex > -1 ? [
      ...selected.slice(0, removedSelectedIndex),
      ...selected.slice(removedSelectedIndex + 1)
    ] : selected
  });
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RESET_CART]: resetCart,
  [Types.ON_START_FETCHING_CART]: onStartFetchingCart,
  [Types.ON_SUCCESS_FETCHING_CART]: onSuccessFetchingCart,
  [Types.ON_ERROR_FETCHING_CART]: onErrorFetchingCart,
  [Types.FETCH_CART]: fetchCart,
  [Types.STORE_CART]: storeCart,
  [Types.UPDATE_CART_QTY]: updateCartQty,
  [Types.TOGGLE_SELECT_ITEM]: toggleSelectItem,  
  [Types.DELETE_CART_ITEM]: deleteCartItem,
})
