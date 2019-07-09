import gql from 'graphql-tag'

export const FETCH_DELIVERIES = gql`
  query fetchDeliveries {
    deliveries {
      _id
      day
      time_start
      time_end
    }
  }
`
