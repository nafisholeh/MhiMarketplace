import gql from 'graphql-tag'

export const FETCH_CART = gql`
  query fetchCart($user_id: ID!) {
    cart(user_id: $user_id) {
      _id
      user_id
      time
      gross_price
      products {
        product_id
        qty
      }
    }
  }
`
