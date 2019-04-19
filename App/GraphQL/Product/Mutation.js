import gql from 'graphql-tag';

export const ADD_PRODUCT = gql`
  mutation addProduct($data: ProductData!) {
    addProduct(data: $data) {
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

export const EDIT_PRODUCT = gql`
  mutation editProduct($data: ProductData!) {
    editProduct(data: $data) {
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
