import gql from 'graphql-tag';

export const NOTIFICATION_BY_USER = gql`
  query userNotifications($user_id: String!) {
    userNotifications(user_id: $user_id) {
      notification_history {
        _id
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
        has_seen
      }
    }
  }
`

export const NOTIFICATION_UNSEEN_TOTAL = gql`
  query userNotificationUnseenTotal($user_id:String!) {
    userNotificationUnseenTotal(user_id:$user_id)
  }
`