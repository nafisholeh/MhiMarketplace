import gql from 'graphql-tag'

export const FETCH_PRODUCT_LIST = gql`
  query fetchProductList {
    products {
      title
      desc
      quantity
      image_url
    }
  }
`