import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import update from 'immutability-helper';

import { store } from 'Containers/App';
import CartActions from 'Redux/CartRedux';
import { FETCH_CART } from './Query';

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
            const { cart } = cache.readQuery({ query: FETCH_CART, variables: { user_id } });
            if (!cart) return null;
            const updateIndex = cart.findIndex(n => n.product._id === product_id);
            const newCart = update(
              cart, 
              {  
                [updateIndex]: {
                  $merge: { qty: qty }
                }
              }
            );
            store.dispatch(CartActions.storeCart(newCart));
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