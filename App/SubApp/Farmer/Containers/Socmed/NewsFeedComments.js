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
import { getUserId, getUserPhoto } from 'Redux/SessionRedux';
import { getSelectedListObject } from 'Redux/ListRedux';
import {
  LIKE,
  DISLIKE,
  cacheLikeComment,
  cacheLikeSubComment,
} from 'GraphQL/Farmer/Mutation';

class NewsFeedComments extends Component {
  render() {
    const {
      selectedNotification,
      comments,
      showCommentInput,
      onSubmitComment,
      loggedInUserId,
      feedId,
      otherCommentTotal,
      onCommentContainerPressed,
      onViewOtherCommentPressed,
      onCommentInputClicked,
      userPhoto,
    } = this.props;
    const { highlightId } = selectedNotification || {};
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
                    highlightId={highlightId}
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
                    onLikeChild={(commentId, subCommentId, name, isLikedByMe) => {
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
            <TouchableOpacity
              onPress={onCommentInputClicked}
            >
              <CommentInput
                disabled
                onSubmitComment={onSubmitComment}
                photo={userPhoto}
              />
            </TouchableOpacity>
          )
          : null
        }
      </TouchableOpacity>
    );
  };
}

const mapStateToProps = createStructuredSelector({
  loggedInUserId: getUserId(),
  userPhoto: getUserPhoto(),
  selectedNotification: getSelectedListObject(),
});

export default connect(mapStateToProps, null)(NewsFeedComments);
