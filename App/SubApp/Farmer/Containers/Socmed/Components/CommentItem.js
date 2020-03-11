import React, { Component } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { PulseIndicator } from "react-native-indicators";
import { ScrollIntoView } from "react-native-scroll-into-view";

import { Colors, Fonts } from "Themes";
import { moderateScale, getIntervalTimeToday, unixToDate } from "Lib";
import { Avatar } from "CommonFarmer";

class CommentItem extends Component {
  state = {
    highlightAnimation: new Animated.Value(1)
  };

  startAnimation = () => {
    const { highlightAnimation } = this.state;
    const { data, highlightId } = this.props;
    const { _id: feedId } = data || {};
    if (highlightId !== feedId) return;
    Animated.timing(highlightAnimation, {
      toValue: 0,
      timing: 800
    }).start(() => {
      Animated.timing(highlightAnimation, {
        toValue: 1,
        duration: 800
      }).start();
    });
  };

  componentDidMount() {
    this.startAnimation();
  }

  componentDidUpdate(prevProps) {
    const { highlightId } = this.props;
    if (prevProps.highlightId !== highlightId) {
      this.startAnimation();
    }
  }

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
      hideCommentButton
    } = this.props;
    const { highlightAnimation } = this.state;
    const { _id: feedId, content, date_commented, author } = data || {};
    const { _id: authorId, ktp_name: name, ktp_photo_face: photo } =
      author || {};
    const date = unixToDate(date_commented);
    const isLoading = feedId < 0;
    const isShowLike = onLike && !hideLikeButton && !isDisableAction;
    const isShowComment = onComment && !hideCommentButton && !isDisableAction;
    const isHighlighted = highlightId === feedId;
    const highlightBgStyle = isHighlighted
      ? highlightAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [Colors.text_light, Colors.text_bg]
        })
      : null;
    const loadingBgStyle = isLoading ? Colors.text_loading : Colors.text_bg;
    return (
      <ScrollIntoView
        align="center"
        animated={true}
        enabled={isHighlighted}
        key={feedId}
        style={{
          marginLeft: moderateScale(isParent ? 10 : 50),
          marginRight: moderateScale(10),
          marginBottom: moderateScale(10)
        }}
      >
        <View
          style={{
            flexDirection: "row"
          }}
        >
          <Avatar
            source={photo}
            size="small"
            style={{
              marginRight: moderateScale(10),
              marginTop: moderateScale(3)
            }}
          />
          <View style={{ flexShrink: 1 }}>
            <Animated.View
              style={{
                backgroundColor: isHighlighted
                  ? highlightBgStyle
                  : loadingBgStyle,
                borderRadius: moderateScale(15),
                paddingHorizontal: moderateScale(15),
                paddingVertical: moderateScale(10),
                marginBottom: moderateScale(5)
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: moderateScale(3)
                }}
              >
                <Text
                  style={{
                    ...Fonts.BODY_NORMAL,
                    fontWeight: "bold"
                  }}
                >
                  {name}
                </Text>
                {isLoading ? (
                  <PulseIndicator
                    size={20}
                    color={Colors.disabled_dark}
                    animationDuration={900}
                    style={{
                      flex: 0,
                      marginLeft: moderateScale(5)
                    }}
                  />
                ) : null}
              </View>
              <Text
                style={{
                  ...Fonts.BODY_NORMAL,
                  lineHeight: moderateScale(18),
                  letterSpacing: 0.3
                }}
              >
                {content}
              </Text>
            </Animated.View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingRight: moderateScale(15),
            marginLeft: moderateScale(50)
          }}
        >
          {date ? (
            <Text
              style={{
                ...Fonts.BODY_SMALL,
                marginRight: moderateScale(15)
              }}
            >
              {getIntervalTimeToday(date, true)}
            </Text>
          ) : null}
          {isShowLike ? (
            <TouchableOpacity
              onPress={() => onLike(feedId, name, isLikedByMe)}
              style={{
                marginRight: moderateScale(15)
              }}
            >
              <Text
                style={{
                  ...Fonts.BODY_SMALL,
                  color: isLikedByMe ? Colors.veggie_dark : Colors.text,
                  fontWeight: "bold"
                }}
              >
                suka
              </Text>
            </TouchableOpacity>
          ) : null}
          {isShowComment ? (
            <TouchableOpacity onPress={() => onComment(feedId, authorId, name)}>
              <Text
                style={{
                  ...Fonts.BODY_SMALL,
                  color: Colors.text,
                  fontWeight: "bold"
                }}
              >
                tanggapi
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </ScrollIntoView>
    );
  }
}

export default CommentItem;
