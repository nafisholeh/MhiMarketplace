import gql from 'graphql-tag'

export const THEORY_CATEGORIES = gql`
  query theoryCategories {
    theoryCategories {
      title
      desc
      thumbnail
    }
  }
`

export const THEORIES = gql`
  query theories {
    theories {
      title
      thumbnail
      url
      enabled
    }
  }
`

export const SEARCH_THEORIES = gql`
  query searchTheories($term:String) {
    searchTheories(term:$term) {
      title
      thumbnail
      url
      enabled
    }
  }
`
