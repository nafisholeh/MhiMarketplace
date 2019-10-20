import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import { string } from 'prop-types';

import { Colors } from 'Themes';
import { moderateScale } from 'Lib';
import CommentItem from './CommentItem';
import { Avatar } from 'CommonFarmer';

class PostComments extends Component {
  state = {
    comment: ''
  };
  
  onChangeComment = text => {
    this.setState({ comment: text });
  };
  
  onCommentToPost = () => {
    const { onCommentToPost } = this.props;
    const { comment } = this.state;
    if (onCommentToPost) {
      onCommentToPost(comment);
    }
  };

  render() {
    const { comment } = this.state;
    const { showCommentInput } = this.props;
    return (
      <View>
        <CommentItem
          content="ini komentar"
          name="Edi anto"
          commentedDate="2019-08-20 00:00:00"
          onLikeParent={() => {}}
          onCommentParent={() => {}}
          onLikeChild={() => {}}
          onCommentChild={() => {}}
          commentReplies={[
            {
              content:"halo om",
              name:"Atik",
              commentedDate:"2019-08-20 00:00:00"
            },
            {
              content:"iya om",
              name:"Edi anto",
              commentedDate:"2019-08-20 00:00:00"
            }
          ]}
        />
        <CommentItem
          content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
          name="Anji"
          commentedDate="2019-10-20 00:00:00"
          onLikeParent={() => {}}
          onCommentParent={() => {}}
          onLikeChild={() => {}}
          onCommentChild={() => {}}
        />
        {showCommentInput
          ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: moderateScale(10),
                marginRight: moderateScale(5),
                marginBottom: moderateScale(10)
              }}
            >
              <Avatar size="small" style={{ marginRight: moderateScale(10) }} />
              <TextInput
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder="Balas postingan..."
                onChangeText={this.onChangeComment}
                onSubmitEditing={this.onCommentToPost}
                value={comment}
                multiline={true}
                style={{
                  flex: 1,
                  marginRight: moderateScale(5),
                  borderWidth: 0.7,
                  borderRadius: moderateScale(10),
                  borderColor: Colors.border,
                }}
              />
            </View>
          )
          : null
        }
      </View>
    )
  };
}

export default PostComments;
