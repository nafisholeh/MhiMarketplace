import gql from 'graphql-tag'

export const FETCH_COURIER_COST = gql`
  query fetchCourierCost {
    courierCosts {
      _id
      distance_min
      distance_max
      cost
      is_per_km
    }
  }
`
