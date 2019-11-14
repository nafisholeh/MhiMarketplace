import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Mutation } from 'react-apollo';

import { Colors, Fonts } from 'Themes';
import { moderateScale, getIntervalTimeToday, unixToDate } from 'Lib';
import { Avatar } from 'CommonFarmer';
import { LIKE, DISLIKE, cacheLike, cacheDislike } from 'GraphQL/Farmer/Mutation';

class CommentItem extends Component {
  renderItem = (
    data,
    onLike,
    onComment,
    isParent,
    isLikedByMe,
  ) => {
    const {
      _id: feedId,
      content,
      date_commented,
      author,
    } = data || {};
    const {
      _id: authorId,
      ktp_name: name,
      ktp_photo_face: photo
    } = author || {};
    const date = unixToDate(date_commented);
    return (
      <View
        key={feedId}
        style={{
          marginLeft: moderateScale(isParent ? 10 : 50),
          marginRight: moderateScale(10),
          marginBottom: moderateScale(10),
        }}
      >
        <View
          style={{
            flexDirection: 'row'
          }}
        >
          <Avatar
            source={photo}
            size="small"
            style={{
              marginRight: moderateScale(10),
              marginTop: moderateScale(3),
            }}
          />
          <View
            style={{
              flexShrink: 1,
            }}
          >
            <View
              style={{
                backgroundColor: Colors.text_bg,
                borderRadius: moderateScale(15),
                paddingHorizontal: moderateScale(15),
                paddingVertical: moderateScale(10),
                marginBottom: moderateScale(5),
              }}
            >
              <Text
                style={{
                  ...Fonts.TITLE_NORMAL,
                  fontWeight: 'bold',
                  marginBottom: moderateScale(3),
                }}
              >
                {name}
              </Text>
              <Text
                style={{
                  ...Fonts.TITLE_NORMAL,
                  lineHeight: moderateScale(18),
                  letterSpacing: 0.3
                }}
              >
                {content}
              </Text>
            </View>
          </View>
        </View>
        
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingRight: moderateScale(15),
            marginLeft: moderateScale(50),
          }}
        >
          {date
            ? (
              <Text
                style={{
                  ...Fonts.TITLE_SMALL,
                  marginRight: moderateScale(15),
                }}
              >
                {getIntervalTimeToday(date, true)}
              </Text>
            )
            : null
          }
          {onLike
            ? (
              <TouchableOpacity
                onPress={() => onLike(feedId, name, isLikedByMe)}
                style={{
                  marginRight: moderateScale(15),
                }}
              >
                <Text
                  style={{
                    ...Fonts.TITLE_SMALL,
                    color: isLikedByMe ? Colors.veggie_dark : Colors.text,
                    fontWeight: 'bold',
                  }}
                >
                  suka
                </Text>
              </TouchableOpacity>
            )
            : null
          }
          {onComment
            ? (
              <TouchableOpacity
                onPress={() => onComment(feedId, name)}
              >
                <Text
                  style={{
                    ...Fonts.TITLE_SMALL,
                    color: Colors.text,
                    fontWeight: 'bold',
                  }}
                >
                  balas
                </Text>
              </TouchableOpacity>
            )
            : null
          }
        </View>
      </View>
    );
  };

  render() {
    const {
      data,
      onLikeParent,
      onCommentParent,
      onLikeChild,
      onCommentChild,
      loggedInUserId,
    } = this.props;
    const { _id: commentId, content_reply, likes = [] } = data || {};
    const isLikedByMe = Array.isArray(likes) && likes.findIndex(({ _id }) => _id === loggedInUserId) >= 0;
    return (
      <View>
        {this.renderItem(data, onLikeParent, onCommentParent, true, isLikedByMe)}
        {Array.isArray(content_reply)
          && content_reply.map((item, index) => {
            const { likes = [] } = item || {};
            const isReplyLikedByMe =
              Array.isArray(likes)
              && likes.findIndex(({ _id }) => _id === loggedInUserId) >= 0;
            return (
              this.renderItem(
                item,
                onLikeChild,
                (subCommentId, name) => onCommentChild(commentId, name),
                false,
                isReplyLikedByMe
              )
            )
        })}
      </View>
    );
  }
}

export default CommentItem;
