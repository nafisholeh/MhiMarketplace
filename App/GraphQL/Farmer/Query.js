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
        ktp_photo_face
      }
      comments {
        _id
        author {
          _id
          ktp_name
          ktp_photo_face
        }
        content
        date_commented
      }
    }
  }
`