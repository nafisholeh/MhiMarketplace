import gql from 'graphql-tag'

export const FETCH_PRODUCT_LIST = gql`
  query fetchProductList {
    products {
      title
      photo
      price
      discount
    }
  }
`

export const FETCH_PRODUCT_DETAIL = gql`
  query fetchProductDetail {
    products {
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