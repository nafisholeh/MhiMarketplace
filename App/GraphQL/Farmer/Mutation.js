import gql from 'graphql-tag';

export const SIGNUP_FARMER = gql`
  mutation signupFarmer($data: UserFarmerInput!) {
    signupFarmer(data: $data) {
      _id
    }
  }
`

export const POST_AS_FARMER = gql`
  mutation postAsFarmer($data: CreateFarmerPostInput) {
    postAsFarmer(data: $data) {
      _id
    }
  }
`

export const COMMENT_TO_POST = gql`
  mutation commentAsFarmer($data: CreateFarmerCommentInput) {
    commentAsFarmer(data: $data) {
      _id
      content
      date_commented
      author {
        _id
        ktp_nik
        ktp_name
      }
      post {
        _id
        content
      }
    }
  }
`

export const REPLY_TO_COMMENT = gql`
  mutation replyCommentAsFarmer($data:CreateFarmerCommentReplyInput) {
    replyCommentAsFarmer(data:$data) {
      _id
      content
      date_commented
      author {
        _id
        ktp_nik
        ktp_name
      }
      comment {
        _id
        content
      }
    }
  }
`