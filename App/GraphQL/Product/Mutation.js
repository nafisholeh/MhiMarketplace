import gql from 'graphql-tag';

import { FETCH_PRODUCT_LIST } from './Query'

export const ADD_PRODUCT = gql`
  mutation addProduct($data: ProductData!, $images: [Upload]) {
    addProduct(data: $data, images: $images) {
      _id
      title
      description
      stock
      unit
      photo
      price
      discount
      expired_date
      category
      packaging
      label
    }
  }
`

export const cacheAddProduct = (cache, { data: { addProduct = {}} = {} }) => {
  const { products = [] } = cache.readQuery({ query: FETCH_PRODUCT_LIST });
  const newProducts =
    Array.isArray(products)
    && [addProduct].concat(products);
  cache.writeQuery({
    query: FETCH_PRODUCT_LIST,
    data: { products: newProducts }
  });
};

export const EDIT_PRODUCT = gql`
  mutation editProduct($data: ProductData!, $images: [Upload]) {
    editProduct(data: $data, images: $images) {
      _id
      title
      description
      stock
      unit
      photo
      price
      discount
      expired_date
      category
      packaging
      label
    }
  }
`

export const cacheEditProduct = (cache, { data }) => {
  const { products = [] } = cache.readQuery({ query: FETCH_PRODUCT_LIST });
  const { _id } = data || {};
  const editedIndex = 
    Array.isArray(products) 
    && products.findIndex(({ _id: iterateId }) => iterateId === _id);
  if (editedIndex >= 0) {
    const newProducts = [
      ...products.slice(0, editedIndex),
      data,
      ...products.slice(editedIndex + 1, products.length)
    ]
    cache.writeQuery({
      query: FETCH_PRODUCT_LIST,
      data: { products: newProducts }
    });
  }
};
