import gql from 'graphql-tag'

export const FETCH_CART = gql`
  query fetchCart($user_id: ID!) {
    cart(user_id: $user_id) {
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
      checked_out
    }
  }
`

export const FETCH_SELECTED_CART = gql`
  query fetchSelectedCart($user_id: ID!) {
    selectedCart(user_id: $user_id) {
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
      checked_out
    }
  }
`