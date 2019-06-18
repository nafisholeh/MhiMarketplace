import gql from 'graphql-tag';

export const START_CHECKOUT = gql`
  mutation startCheckout($user_id: String!) {
    startCheckout(user_id: $user_id) {
      _id
      user_id
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

export const CONFIRM_ORDER = gql`
  mutation($_id: String!, $account_number: String!, $account_bank: String!, $total_paid: Int!, $transaction_detail: String) {
    confirmOrder(_id: $_id, account_number: $account_number, account_bank: $account_bank, total_paid: $total_paid, transaction_detail: $transaction_detail) {
      _id
      cart_id
      time
      total_cost
      time_stamp {
        ready_to_process
      }
      account_number
      account_bank
      total_paid
      transaction_detail
    }
  }
`
