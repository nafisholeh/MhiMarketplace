import gql from 'graphql-tag';

export const CONFIRM_ORDER = gql`
  mutation($_id: String!, $account_number: String!, $account_bank: String!, $total_paid: Int!, $transaction_detail: String) {
    confirmOrder(_id: $_id, account_number: $account_number, account_bank: $account_bank, total_paid: $total_paid, transaction_detail: $transaction_detail) {
      _id
      cart_id
      time
      total_cost
      time_paid_off
      account_number
      account_bank
      total_paid
      transaction_detail
    }
  }
`
