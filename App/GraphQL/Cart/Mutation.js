import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import update from 'immutability-helper';

import { store } from 'Containers/App';
import CartActions from 'Redux/CartRedux';
import { FETCH_CART } from './Query';

export const SYNC_CART = gql`
  mutation syncCartItem($user_id: String!, $cart_item: [SyncCartItem]) {
    syncCart(user_id: $user_id, cart_item: $cart_item) {
      _id
      product {
        _id
        title
        photo
        price
        discount
      }
      qty
      selected
    }
  }
`

export const DELETE_CART_ITEM = gql`
  mutation deleteCartItem($user_id: String!, $product_id: String!) {
    deleteItem(user_id: $user_id, product_id: $product_id) {
      _id
    }
  }
`

export const UPDATE_CART_ITEM_SCHEMA = gql`
  mutation updateCartItem($user_id: String!, $product_id: String!, $qty: Int) {
    updateItem(user_id: $user_id, product_id: $product_id, qty: $qty) {
      _id
      product {
        _id
        title
        photo
        price
        discount
      }
      qty
      selected
    }
  }
`

// mutation props utk handle sinkronisasi dan mutasi ubah kuantitas item di keranjang belanja
export const UPDATE_CART_ITEM = graphql(UPDATE_CART_ITEM_SCHEMA, {
  props: ({ ownProps, mutate }) => ({
    updateCartItem: ({ user_id, product_id, qty }) =>
      mutate({
        variables: { user_id, product_id, qty },
        ignoreResults: false,
        errorPolicy: 'all',
        update: ( cache, { data } ) => {
          try {
            const { cart } = cache.readQuery({ query: FETCH_CART, variables: { user_id } });
            const updateIndex = cart.findIndex(n => n.product._id === product_id);
            if (updateIndex === -1) {
              const { updateItem } = data;
              store.dispatch(CartActions.storeCart(updateItem));
              cache.writeQuery({
                query: FETCH_CART,
                variables: { user_id },
                data: { cart: updateItem }
              });
              return;
            }
            const newCart = update(
              cart, 
              {  
                [updateIndex]: {
                  $merge: { qty: qty }
                }
              }
            );
            cache.writeQuery({                                                          // ubah kuantitas item keranjang belanja di client cache
              query: FETCH_CART,                                                    // trigger UI Query dari GET_CART_ITEMS utk re-render
              variables: { user_id },
              data: { cart: newCart }
            });
          } catch(err) {
            return null;
          }
        },
      })
  })
})