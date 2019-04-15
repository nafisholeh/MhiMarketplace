import gql from 'graphql-tag'

export const FETCH_PAYMENT_OPTION = gql`
  query fetchPaymentOptions {
    paymentOptions{
      _id
      type
      detail
      how_to_pay
    }
  }
`
