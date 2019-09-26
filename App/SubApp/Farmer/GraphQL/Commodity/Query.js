import gql from 'graphql-tag'

export const FETCH_COMMODITIES = gql`
  query fetchCommodities {
    commodities {
      _id
      nama
      key
    }
  }
`