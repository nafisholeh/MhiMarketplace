import gql from 'graphql-tag';

export const READING_NOTIFICATION = gql`
  mutation readingNotifications($user_id:String!) {
    readingNotifications(user_id:$user_id) {
      message
    }
  }
`