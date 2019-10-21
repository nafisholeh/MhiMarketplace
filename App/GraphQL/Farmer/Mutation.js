import gql from 'graphql-tag';

import { FETCH_FARMER_POSTS } from './Query';

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

export const LIKE = gql`
  mutation like($elementId:String!, $userId:String!, $type:String!) {
    like(elementId:$elementId, userId:$userId, type:$type) {
      _id
      likesPost
      likesComment
      likesCommentReply
    }
  }
`

export const DISLIKE = gql`
  mutation dislike($elementId:String!, $userId:String!, $type:String!) {
    dislike(elementId:$elementId, userId:$userId, type:$type) {
      _id
      likesPost
      likesComment
      likesCommentReply
    }
  }
`

export const cacheLike = ( cache, feedId, userId ) => {
  try {
    const { farmerPosts } = cache.readQuery({
      query: FETCH_FARMER_POSTS
    });
    const updatedIndex = farmerPosts.findIndex(({ _id }) => _id === feedId);
    const { likes_total, likes } = farmerPosts[updatedIndex];
    const updatedData = Object.assign(
      farmerPosts[updatedIndex],
      {
        likes_total: likes_total + 1,
        likes: [...likes, { _id: userId, __typename: 'UserFarmer' }],
        __typename: 'FarmerPost'
      }
    );
    cache.writeQuery({
      query: FETCH_FARMER_POSTS,
      data: {
        farmerPosts: [
          ...farmerPosts.slice(0, updatedIndex),
          updatedData,
          ...farmerPosts.slice(updatedIndex + 1, farmerPosts.length)
        ]
      }
    });
  } catch(err) {
    return null;
  }
};
