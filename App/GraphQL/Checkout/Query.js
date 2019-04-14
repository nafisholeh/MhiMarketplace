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
