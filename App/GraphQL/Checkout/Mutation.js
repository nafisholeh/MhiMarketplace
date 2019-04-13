import gql from 'graphql-tag';

export const ADD_CHECKOUT = gql`
  mutation addCheckout($user_id: String!) {
    addCheckout(user_id: $user_id) {
      _id
      user_id
      time
      gross_price
      total_discount
      courier_cost
      total_cost
      products {
        _id
        qty
      }
    }
  }
`
