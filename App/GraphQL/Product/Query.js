import gql from 'graphql-tag'

export const FETCH_PRODUCT_LIST = gql`
  query fetchProductList($term: String, $limit: Int, $sort: SortType) {
    products(term: $term, limit: $limit, sort: $sort) {
      _id
      title
      photo
      price
      unit
      stock
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
      label
      category
      packaging
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

export const FETCH_PRODUCT_CATEGORY = gql`
  query fetchProductCategory {
    productCategory {
      _id
      title
    }
  }
`

export const FETCH_PRODUCT_PACKAGING = gql`
  query fetchProductPackaging {
    productPackaging {
      _id
      qty
      unit
    }
  }
`
