import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import { string } from 'prop-types';

import { Colors } from 'Themes';
import { moderateScale, getIntervalTimeToday, unixToDate } from 'Lib';
import CommentItem from './CommentItem';
import CommentInput from './CommentInput';
import { Avatar } from 'CommonFarmer';

class PostComments extends Component {
  render() {
    const {
      comments,
      showCommentInput,
      onSubmitComment,
    } = this.props;
    return (
      <View
        style={{
          paddingVertical: moderateScale(15)
        }}
      >
        {Array.isArray(comments) && comments.map((item) => {
          const { _id: commentId, content, author, date_commented } = item || {};
          const { _id: authorId, ktp_name, ktp_photo_face } = author || {};
          return (
            <CommentItem
              key={commentId}
              feedId={commentId}
              content={content}
              name={ktp_name}
              commentedDate={unixToDate(date_commented)}
              // commentReplies={}
              {...this.props}
            />
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
      </View>
    )
  };
}

export default PostComments;
