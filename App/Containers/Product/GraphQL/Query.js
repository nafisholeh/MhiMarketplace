import gql from 'graphql-tag'

export const FETCH_PRODUCT_DETAIL = gql`
  query fetchProductDetail($_id: ID!) {
    product(_id: $_id) {
      _id
      title
      description
      stock
      unit
      photo
      price
      discount
      expired_date
      minimum_order
    }
  }
`
