import React, { Component } from "react";
import { Text, TouchableOpacity } from "react-native";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import { CommentList } from "./Comments";
import { Fonts } from "Themes";
import { moderateScale } from "Lib";
import { CommentInput } from "./Components";
import { getUserId, getUserPhoto } from "Redux/SessionRedux";
import { getSelectedNotification } from "Redux/NotificationRedux";

class NewsFeedComments extends Component {
  render() {
    const {
      selectedNotification,
      showCommentInput,
      onSubmitComment,
      otherCommentTotal,
      onCommentContainerPressed,
      onViewOtherCommentPressed,
      onCommentInputClicked,
      userPhoto
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
        {otherCommentTotal && onViewOtherCommentPressed ? (
          <TouchableOpacity
            onPress={onViewOtherCommentPressed}
            style={{
              paddingBottom: moderateScale(15),
              paddingHorizontal: moderateScale(10)
            }}
          >
            <Text
              style={{
                ...Fonts.TITLE_NORMAL,
                color: "rgba(0,0,0,0.3)"
              }}
            >
              Lihat {otherCommentTotal} diskusi lainnya
            </Text>
          </TouchableOpacity>
        ) : null}
        <CommentList highlightId={highlightId} {...this.props} />
        {showCommentInput ? (
          <TouchableOpacity onPress={onCommentInputClicked}>
            <CommentInput
              disabled
              onSubmitComment={onSubmitComment}
              photo={userPhoto}
            />
          </TouchableOpacity>
        ) : null}
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  loggedInUserId: getUserId(),
  userPhoto: getUserPhoto(),
  selectedNotification: getSelectedNotification()
});

export default connect(mapStateToProps, null)(NewsFeedComments);
