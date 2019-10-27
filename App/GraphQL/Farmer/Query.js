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
      likes {
        _id
      }
      likes_total
      comments {
        _id
        author {
          _id
          ktp_name
          ktp_photo_face
        }
        content
        date_commented
        content_reply {
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
  }
`

export const FETCH_FARMER_POST = gql`
  query farmerPost($_id:String!) {
    farmerPost(_id:$_id) {
      _id
      content
      date_posted
      author {
        _id
        ktp_name
        ktp_photo_face
      }
      likes {
        _id
      }
      likes_total
      comments {
        _id
        author {
          _id
          ktp_name
          ktp_photo_face
        }
        content
        date_commented
        content_reply {
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
  }
`
