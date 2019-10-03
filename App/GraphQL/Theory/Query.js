import gql from 'graphql-tag'

export const THEORY_CATEGORIES = gql`
  query theoryCategories {
    theoryCategories {
      _id
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
  query searchTheories($term:String, $categoryId:String) {
    searchTheories(term:$term, categoryId:$categoryId) {
      title
      thumbnail
      url
      enabled
    }
  }
`
