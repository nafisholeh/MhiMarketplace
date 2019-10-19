import gql from 'graphql-tag'

export const FETCH_FARMER_POSTS = gql`
  query farmerPosts {
    farmerPosts {
      _id
      content
      date_posted
      author {
        _id
        ktp_name
      }
      comments {
        _id
        content
      }
    }
  }
`