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
    const { comments, showCommentInput, onSubmitComment } = this.props;
    return (
      <View>
        {Array.isArray(comments) && comments.map((item) => {
          const { _id: commentId, content, author, date_commented } = item || {};
          const { _id: authorId, ktp_name, ktp_photo_face } = author || {};
          return (
            <CommentItem
              content={content}
              name={ktp_name}
              commentedDate={unixToDate(date_commented)}
              onLikeParent={() => {}}
              onCommentParent={() => {}}
              onLikeChild={() => {}}
              onCommentChild={() => {}}
              // commentReplies={}
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
