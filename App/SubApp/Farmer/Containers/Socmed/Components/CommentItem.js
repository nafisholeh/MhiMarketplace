import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { PulseIndicator } from 'react-native-indicators';
import { ScrollIntoView } from 'react-native-scroll-into-view';

import { Colors, Fonts } from 'Themes';
import { moderateScale, getIntervalTimeToday, unixToDate } from 'Lib';
import { Avatar } from 'CommonFarmer';

class CommentItem extends Component {
  render() {
    const {
      data,
      onLike,
      onComment,
      isParent,
      isLikedByMe,
      isDisableAction,
      highlightId,
      hideLikeButton,
      hideCommentButton,
    } = this.props;
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
    const isLoading = feedId < 0;
    const isShowLike = onLike && !hideLikeButton && !isDisableAction;
    const isShowComment = onComment && !hideCommentButton && !isDisableAction;
    return (
      <ScrollIntoView
        align="center"
        animated={true}
        enabled={highlightId === feedId ? true : false}
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
                backgroundColor: isLoading ? Colors.text_loading : Colors.text_bg,
                borderRadius: moderateScale(15),
                paddingHorizontal: moderateScale(15),
                paddingVertical: moderateScale(10),
                marginBottom: moderateScale(5),
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: moderateScale(3),
                }}
              >
                <Text
                  style={{
                    ...Fonts.TITLE_NORMAL,
                    fontWeight: 'bold',
                  }}
                >
                  {name}
                </Text>
                {isLoading
                  ? (
                    <PulseIndicator
                      size={20}
                      color={Colors.disabled_dark}
                      animationDuration={900}
                      style={{
                        flex: 0,
                        marginLeft: moderateScale(5),
                      }}
                    />
                  )
                  : null
                }                
              </View>
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
          {isShowLike
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
          {isShowComment
            ? (
              <TouchableOpacity
                onPress={() => onComment(feedId, authorId, name)}
              >
                <Text
                  style={{
                    ...Fonts.TITLE_SMALL,
                    color: Colors.text,
                    fontWeight: 'bold',
                  }}
                >
                  tanggapi
                </Text>
              </TouchableOpacity>
            )
            : null
          }
        </View>
      </ScrollIntoView>
    );
  }
}

export default CommentItem;
