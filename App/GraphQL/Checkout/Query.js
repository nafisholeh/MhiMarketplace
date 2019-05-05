import gql from 'graphql-tag'

export const FETCH_CHECKOUT_ITEMS = gql`
  query fetchCheckoutItems($user_id:String!, $_id:String!) {
    checkout(user_id:$user_id, _id:$_id) {
      _id
      product {
        _id
        title
        photo
        price
        discount
        unit
      }
      qty
      selected
    }
  }
`

export const FETCH_CHECKOUT_SUMMARY = gql`
  query fetchCheckoutSummary($_id:String!) {
    checkoutSummary(_id:$_id) {
      _id
      user_id
      transaction_id
      time_start
      gross_price
      total_discount
      courier_cost
      total_cost
      payment_option {
        type
        detail
        how_to_pay
      }
      products {
        _id
        product {
          _id
          title
          photo
          price
          discount
          unit
        }
        qty
        selected
      }
    }
  }
`
