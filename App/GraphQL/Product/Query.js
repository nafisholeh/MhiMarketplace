import gql from 'graphql-tag'

export const FETCH_PRODUCT_LIST = gql`
  query fetchProductList {
    products {
      _id
      title
      photo
      price
      discount
    }
  }
`

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

export const FETCH_SOME_PRODUCT = gql`
  query fetchSomeProduct($ids: [ID!]!) {
    someProducts(ids: $ids) {
      _id
      title
      unit
      photo
      price
      discount
    }
  }
`