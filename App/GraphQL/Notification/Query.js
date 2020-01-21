import gql from 'graphql-tag';

export const NOTIFICATION_BY_USER = gql`
  query userNotifications($user_id: String!) {
    userNotifications(user_id: $user_id) {
      notification_history {
        context
        content_preview
        date
        user_target {
          ktp_name
          ktp_photo_face
        }
        user_origin {
          ktp_name
          ktp_photo_face
        }
        post
        comment
        sub_comment
      }
    }
  }
`