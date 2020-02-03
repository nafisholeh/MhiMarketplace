import React, { Component, Fragment } from 'react';
import { Mutation } from 'react-apollo';

import { CommentItem } from '../Components';
import {
  LIKE,
  cacheLikeComment,
  cacheLikeSubComment,
} from 'GraphQL/Farmer/Mutation';

export default class Comments extends Component {
  render() {
    const {
      comments,
      loggedInUserId,
      onCommentParent,
      onCommentChild,
      highlightId,
      hideLikeButton,
      hideCommentButton,
    } = this.props;
    return (
      Array.isArray(comments) && comments.map((item, index) => {
        return (
          <Mutation
            key={index}
            mutation={LIKE}
            ignoreResults={false}
            errorPolicy='all'>
            { (mutate, {loading, error, data}) => {
              const { _id: commentId, content_reply, likes = [], author } = item || {};
              const { _id: commentAuthorId } = author || {};
              const isOurOwn = commentAuthorId === loggedInUserId;
              const isLikedByMe = Array.isArray(likes) && likes.findIndex(({ _id }) => _id === loggedInUserId) >= 0;
              return (
                <Fragment>
                  <CommentItem
                    data={item}
                    onLike={(commentId, name, isLikedByMe) => {
                      mutate({
                        variables: {
                          elementId: commentId,
                          userId: loggedInUserId,
                          type: "COMMENT",
                          action: isLikedByMe ? "dislike" : "like"
                        },
                        update: ((cache, data) => 
                          cacheLikeComment(
                            cache,
                            feedId,
                            commentId,
                            loggedInUserId,
                            isLikedByMe ? "dislike" : "like"
                          )
                        )
                      });
                    }}
                    onComment={onCommentParent}
                    isParent={true}
                    isLikedByMe={isLikedByMe}
                    isDisableAction={isOurOwn}
                    highlightId={highlightId}
                    hideLikeButton={hideLikeButton}
                    hideCommentButton={hideCommentButton}
                  />
                  {Array.isArray(content_reply)
                    && content_reply.map((item, index) => {
                      const { likes = [], author } = item || {};
                      const { _id: subCommentAuthorId } = author || {};
                      const isReplyLikedByMe =
                        Array.isArray(likes)
                        && likes.findIndex(({ _id }) => _id === loggedInUserId) >= 0;
                      const isOurOwnSubComment = subCommentAuthorId === loggedInUserId;
                      return (
                        <CommentItem
                          data={item}
                          onLike={(commentId, subCommentId, name, isLikedByMe) => 
                            mutate({
                              variables: {
                                elementId: subCommentId,
                                userId: loggedInUserId,
                                type: "COMMENT_REPLY",
                                action: isLikedByMe ? "dislike" : "like"
                              },
                              update: ((cache, data) => 
                                cacheLikeSubComment(
                                  cache,
                                  feedId,
                                  commentId,
                                  subCommentId,
                                  loggedInUserId,
                                  isLikedByMe ? "dislike" : "like"
                                )
                              )
                            })
                          }
                          onComment={onCommentChild}
                          isParent={false}
                          isLikedByMe={isReplyLikedByMe}
                          isDisableAction={isOurOwnSubComment}
                          highlightId={highlightId}
                          hideLikeButton={hideLikeButton}
                          hideCommentButton={hideCommentButton}
                        />
                      )
                  })}
                </Fragment>
              );
            }}
          </Mutation>
        );
      }
    )
  )}
}
