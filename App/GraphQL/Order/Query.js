import gql from 'graphql-tag';

export const INITIAL_CHECKOUT_LIST = gql`
  query initialCheckouts {
    initialCheckouts {
      _id
      user_id {
        name
      }
      time
      total_cost
      products {
        _id
        qty
      }
    }
  }
`

export const COMPLETED_CHECKOUT_LIST = gql`
  query completedCheckouts {
    completedCheckouts {
      _id
      user_id {
        name
      }
      time
      total_cost
      products {
        _id
        qty
      }
    }
  }
`

export const PAID_OFF_CHECKOUT_LIST = gql`
  query paidOffCheckouts {
    paidOffCheckouts {
      _id
      user_id {
        name
      }
      time
      total_cost
      products {
        _id
        qty
      }
    }
  }
`
