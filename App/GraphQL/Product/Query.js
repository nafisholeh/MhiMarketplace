import gql from 'graphql-tag'

export const FETCH_PRODUCT_LIST = gql`
  query fetchProductList($term: String, $category: String, $limit: Int, $sort: SortType) {
    products(term: $term, category: $category, limit: $limit, sort: $sort) {
      _id
      title
      photo
      price
      unit
      stock
      discount
      label
      category
      packaging
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
      category {
        title
      }
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
      label
      category
      packaging
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
