import gql from 'graphql-tag';

export const LOG_PRODUCT_VISIT = gql`
  mutation addproductDetailVisitLog($user_id: String, $product_id: String!) {
    addproductDetailVisitLog(user_id: $user_id, product_id:$product_id) {
  		_id
      user_id
  		product_id
    }
  }
`