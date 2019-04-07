import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { FETCH_CART } from './Query';

export const UPDATE_CART_ITEM_SCHEMA = gql`
  mutation updateCartItem($user_id: String!, $product_id: String!, $qty: Int) {
    updateItem(user_id: $user_id, product_id: $product_id, qty: $qty) {
      _id
      user_id
      time
      gross_price
      products {
        product {
          _id
          title
          description
          stock
        }
        qty
      }
    }
  }
`

// mutation props utk handle sinkronisasi dan mutasi ubah kuantitas item di keranjang belanja
export const UPDATE_CART_ITEM = graphql(UPDATE_CART_ITEM_SCHEMA, {
  props: ({ ownProps, mutate }) => ({
    updateCartItem: ({ user_id, product_id, qty }) =>
      mutate({
        variables: { user_id, product_id, qty },
        update: ( cache, { data } ) => {
          try {
            const cartCache = cache.readQuery({ query: FETCH_CART, variables: { user_id } });
            console.tron.log('UPDATE_CART_ITEM success', data, cartCache);
          } catch(err) {
            console.tron.log('UPDATE_CART_ITEM error', err);
          }
        }
      })
  })
})