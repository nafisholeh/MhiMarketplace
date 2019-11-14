import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import { Mutation } from 'react-apollo';

import { Colors, Fonts } from 'Themes';
import { moderateScale, getIntervalTimeToday, unixToDate } from 'Lib';
import { CommentItem, CommentInput } from './Components';
import { Avatar } from 'CommonFarmer';
import { getMockUserId } from 'Redux/SessionRedux';
import {
  LIKE,
  DISLIKE,
  cacheLikeComment,
  cacheDislikeComment,
} from 'GraphQL/Farmer/Mutation';

class NewsFeedComments extends Component {
  render() {
    const {
      comments,
      showCommentInput,
      onSubmitComment,
      loggedInUserId,
      feedId,
      otherCommentTotal,
      onCommentContainerPressed,
      onViewOtherCommentPressed,
    } = this.props;
    return (
      <TouchableOpacity
        style={{
          paddingTop: moderateScale(15),
          paddingBottom: moderateScale(5)
        }}
        onPress={() => {
          if (onCommentContainerPressed) onCommentContainerPressed();
        }}
      >
        {otherCommentTotal && onViewOtherCommentPressed
          ? (
            <TouchableOpacity
              onPress={onViewOtherCommentPressed}
              style={{
                paddingBottom: moderateScale(15),
                paddingHorizontal: moderateScale(10),
              }}
            >
              <Text
                style={{
                  ...Fonts.TITLE_NORMAL,
                  color: 'rgba(0,0,0,0.3)',
                }}
              >
                Lihat {otherCommentTotal} diskusi lainnya
              </Text>
            </TouchableOpacity>
          )
          : null
        }
        {Array.isArray(comments) && comments.map((item, index) => {
          const { _id: commentId } = item || {};
          return (
            <Mutation
              key={index}
              mutation={LIKE}
              ignoreResults={false}
              errorPolicy='all'>
              { (mutate, {loading, error, data}) => {
                return (
                  <CommentItem
                    data={item}
                    onLikeParent={(commentId, name, isLikedByMe) => {
                      mutate({
                        variables: {
                          elementId: commentId,
                          userId: loggedInUserId,
                          type: "COMMENT",
                          action: isLikedByMe ? "dislike" : "like"
                        },
                        update: ((cache, data) => 
                          cacheLikeComment(cache, feedId, commentId, loggedInUserId, isLikedByMe ? "dislike" : "like")
                        )
                      });
                    }}
                    onLikeChild={(commentId, name, isLikedByMe) => {
                      mutate({
                        variables: {
                          elementId: commentId,
                          userId: loggedInUserId,
                          type: "COMMENT_REPLY",
                          action: isLikedByMe ? "dislike" : "like"
                        },
                        update: ((cache, data) => 
                          cacheLikeComment(cache, feedId, commentId, loggedInUserId, isLikedByMe ? "dislike" : "like")
                        )
                      });
                    }}
                    {...this.props}
                  />
                );
              }}
            </Mutation>
          );
        })}
        {showCommentInput
          ? (
            <CommentInput
              onSubmitComment={onSubmitComment}
            />
          )
          : null
        }
      </TouchableOpacity>
    );
  };
}

const mapStateToProps = createStructuredSelector({
  loggedInUserId: getMockUserId(),
});

export default connect(mapStateToProps, null)(NewsFeedComments);
