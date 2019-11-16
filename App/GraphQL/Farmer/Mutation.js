import gql from 'graphql-tag';

import ApolloClientProvider from 'Services/ApolloClientProvider';
import { FETCH_FARMER_POSTS, FETCH_FARMER_POST } from './Query';

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
      content
      author {
        _id
        ktp_nik
        ktp_name
      }
      date_posted
      comments {
        _id
      }
      likes_total
      likes {
        _id
      } 
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
      likes_total
      likes {
        _id
      }
      comments_total
      content_reply {
        _id
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
      }
      likes {
        _id
      }
      likes_total
    }
  }
`

export const LIKE = gql`
  mutation like($elementId:String!, $userId:String!, $type:String!, $action:String!) {
    like(elementId:$elementId, userId:$userId, type:$type, action:$action) {
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

export const cachePostSubmit = ( cache, { data }) => {
  try {
    const { farmerPosts = [] } = cache.readQuery({
      query: FETCH_FARMER_POSTS
    });
    const { postAsFarmer: newPost } = data || {};
    ApolloClientProvider.client.writeQuery({
      query: FETCH_FARMER_POSTS,
      data: {
        farmerPosts: [
          newPost,
          ...farmerPosts,
        ]
      }
    });
  } catch (err) {
    return;
  }
};

export const cacheLike = ( cache, feedId, userId ) => {
  try {
    const { farmerPosts } = cache.readQuery({
      query: FETCH_FARMER_POSTS
    });
    const updatedIndex = farmerPosts.findIndex(({ _id }) => _id === feedId);
    const { likes_total, likes } = farmerPosts[updatedIndex];
    const updatedData = {
      ...farmerPosts[updatedIndex],
      ...{
        likes_total: likes_total + 1,
        likes: [...likes, { _id: userId, __typename: 'UserFarmer' }],
        __typename: 'FarmerPost'
      }
    };
    ApolloClientProvider.client.writeQuery({
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

export const cacheDislike = ( cache, feedId, userId ) => {
  try {
    const { farmerPosts } = cache.readQuery({
      query: FETCH_FARMER_POSTS
    });
    const updatedIndex = farmerPosts.findIndex(({ _id }) => _id === feedId);
    const { likes_total, likes } = farmerPosts[updatedIndex];
    const removedLikesIndex = likes.findIndex(({ _id }) => _id === userId);
    const updatedData = {
      ...farmerPosts[updatedIndex],
      ...{
        likes_total: likes_total - 1,
        likes: [
          ...likes.slice(0, removedLikesIndex),
          ...likes.slice(removedLikesIndex + 1, likes.length)
        ],
        __typename: 'FarmerPost'
      }
    };
    ApolloClientProvider.client.writeQuery({
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

export const cacheLikeComment = ( cache, feedId, commentId, userId, action ) => {
  try {
    const data = cache.readQuery({
      query: FETCH_FARMER_POST,
      variables: {
        _id: feedId
      }
    });
    const { farmerPost: farmerPostOld = {} } = data || {};
    const { comments = [] } = farmerPostOld || {};
    if (!Array.isArray(comments) || !comments.length) return;
    const matchCommentId = comments.findIndex(({ _id }) => _id === commentId);
    if (matchCommentId < 0) return;
    const { likes, likes_total } = comments[matchCommentId];
    const matchUserId = likes.findIndex(({ _id }) => _id === userId);
    ApolloClientProvider.client.writeQuery({
      query: FETCH_FARMER_POST,
      data: {
        farmerPost: {
          ...farmerPostOld,
          ...{
            comments: [
              ...comments.slice(0, matchCommentId),
              action === "like" 
                ? {
                  ...comments[matchCommentId],
                  ...{
                    likes_total: likes_total + 1,
                    likes: [...likes, { _id: userId, __typename: 'UserFarmer' }],
                    __typename: 'FarmerPost'
                  }
                }
                : {
                  ...comments[matchCommentId],
                  ...{
                    likes_total: likes_total - 1,
                    likes: [
                      ...likes.slice(0, matchUserId),
                      ...likes.slice(matchUserId + 1, likes.length)
                    ],
                    __typename: 'FarmerPost'
                  }
                },
              ...comments.slice(matchCommentId + 1, comments.length)
            ]
          }
        }
      }
    });
  } catch(err) {
    return null;
  }
}

export const cacheLikeSubComment = ( cache, feedId, commentId, subCommentId, userId, action ) => {
  try {
    const data = cache.readQuery({
      query: FETCH_FARMER_POST,
      variables: {
        _id: feedId
      }
    });
    const { farmerPost: farmerPostOld = {} } = data || {};
    const { comments: oldComments = [] } = farmerPostOld || {};
    if (!Array.isArray(oldComments) || !oldComments.length) return;
    const matchedCommentsIndex = oldComments.findIndex(({ _id }) => _id === commentId);
    if (matchedCommentsIndex < 0) return;
    const { content_reply: oldSubComments = [] } = oldComments[matchedCommentsIndex] || [];
    const matchedSubCommentIndex = oldSubComments.findIndex(({ _id }) => _id === subCommentId);
    if (matchedSubCommentIndex < 0) return;
    const matchedSubComment = oldSubComments[matchedSubCommentIndex];
    const { likes, likes_total } = matchedSubComment || {};
    const matchUserId = likes.findIndex(({ _id }) => _id === userId);
    ApolloClientProvider.client.writeQuery({
      query: FETCH_FARMER_POST,
      data: {
        farmerPost: {
          ...farmerPostOld,
          ...{
            comments: [
              ...oldComments.slice(0, matchedCommentsIndex),
              {
                ...oldComments[matchedCommentsIndex],
                ...{
                  content_reply: [
                    ...oldSubComments.slice(0, matchedSubCommentIndex),
                    action === "like" 
                      ? {
                        ...matchedSubComment,
                        ...{
                          likes_total: likes_total + 1,
                          likes: [...likes, { _id: userId, __typename: 'UserFarmer' }],
                        }
                      }
                      : {
                        ...matchedSubComment,
                        ...{
                          likes_total: likes_total - 1,
                          likes: [
                            ...likes.slice(0, matchUserId),
                            ...likes.slice(matchUserId + 1, likes.length)
                          ],
                        }
                      },
                    ...oldSubComments.slice(matchedSubCommentIndex + 1, oldSubComments.length)
                  ]
                }
              },
              ...oldComments.slice(matchedCommentsIndex + 1, oldComments.length),
            ]
          }
        }
      }
    });
  } catch(err) {
    return null;
  }
}

export const cacheCommentReply = ( cache, { data }, feedId, comment ) => {
  try {
    const dataCache = cache.readQuery({
      query: FETCH_FARMER_POST,
      variables: {
        _id: feedId
      }
    });
    const { farmerPost: farmerPostOld = {} } = dataCache || {};
    const { comments: oldComments = [] } = farmerPostOld || {};
    const { commentAsFarmer: newComment } = data || {};
    if (Array.isArray(oldComments)) {
      ApolloClientProvider.client.writeQuery({
        query: FETCH_FARMER_POST,
        data: {
          farmerPost: {
            ...farmerPostOld,
            ...{
              comments: 
                oldComments.length
                  ? [ ...oldComments, newComment ]
                  : [ newComment ]
            }
          }
        }
      });
    } 
  } catch(err) {
    return null;
  }
};

export const cacheSubCommentReply = ( cache, { data }, feedId, parentId, comment ) => {
  try {
    const { replyCommentAsFarmer: newSubComment } = data || {};
    
    const dataCache = cache.readQuery({
      query: FETCH_FARMER_POST,
      variables: {
        _id: feedId
      }
    });
    const { farmerPost: farmerPostOld = {} } = dataCache || {};
    const { comments: oldComments = [] } = farmerPostOld || {};
    const matchedCommentsIndex =
      Array.isArray(oldComments)
      && oldComments.findIndex(({ _id }) => _id === parentId);
    if (matchedCommentsIndex < 0) return;
    const { content_reply: oldSubComments = [] } = oldComments[matchedCommentsIndex] || [];
    ApolloClientProvider.client.writeQuery({
      query: FETCH_FARMER_POST,
      data: {
        farmerPost: {
          ...farmerPostOld,
          ...{
            comments: [
              ...oldComments.slice(0, matchedCommentsIndex),
              {
                ...oldComments[matchedCommentsIndex],
                ...{
                  content_reply: 
                    oldSubComments.length
                      ? [ ...oldSubComments, newSubComment ]
                      : [ newSubComment ]
                }
              },
              ...oldComments.slice(matchedCommentsIndex + 1, oldComments.length),
            ]
          }
        }
      }
    });
  } catch(err) {
    return null;
  }
};
