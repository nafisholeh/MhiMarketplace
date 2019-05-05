import gql from 'graphql-tag';

export const START_CHECKOUT = gql`
  mutation startCheckout($user_id: String!) {
    startCheckout(user_id: $user_id) {
      _id
      user_id
      time_start
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

export const FINISH_CHECKOUT = gql`
  mutation finishCheckout($_id: String!, $payment_option: String!, $gross_price: Int!, $total_discount: Int!, $courier_cost: Int!, $total_cost: Int!) {
    finishCheckout(_id:$_id, payment_option:$payment_option, gross_price:$gross_price, total_discount:$total_discount, courier_cost:$courier_cost, total_cost:$total_cost) {
      _id
      user_id
      time_start
      time_finish
      payment_option {
        type
        detail
        how_to_pay
      }
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
