import React, { Component } from "react";
import {
  View,
  Text,
  Keyboard,
  TextInput,
  Image,
  TouchableOpacity
} from "react-native";

import { Colors, Images, FONTS } from "Themes";
import { moderateScale } from "Lib";
import { Avatar } from "CommonFarmer";

class CommentInput extends Component {
  state = {
    comment: "",
    showSendButton: false
  };

  onChangeComment = text => {
    this.setState({ comment: text });
  };

  onSubmitComment = () => {
    const { onSubmitComment } = this.props;
    const { comment } = this.state;
    if (onSubmitComment) {
      onSubmitComment(comment);
      this.setState({ comment: "", showSendButton: false });
      Keyboard.dismiss();
    }
  };

  onFocus = () => {
    this.setState({ showSendButton: true });
  };

  onBlur = () => {
    const { comment } = this.state;
    if (!comment || comment === "") {
      this.setState({ showSendButton: false });
    }
  };

  render() {
    const {
      style,
      showInfo,
      info,
      onClosingInfo,
      disabled,
      photo
    } = this.props;
    const { comment, showSendButton } = this.state;
    return (
      <View>
        {showInfo ? (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: moderateScale(50),
              marginBottom: moderateScale(5)
            }}
            onPress={onClosingInfo}
          >
            <Text
              style={{
                ...FONTS.BODY_SMALL,
                fontStyle: "italic",
                marginRight: moderateScale(15)
              }}
            >
              {info}
            </Text>
            <Image
              source={Images.cross}
              style={{
                width: moderateScale(10),
                height: moderateScale(10)
              }}
            />
          </TouchableOpacity>
        ) : null}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: moderateScale(10),
            marginRight: moderateScale(5),
            marginBottom: moderateScale(10),
            ...style
          }}
        >
          <Avatar
            size="small"
            source={photo}
            style={{ marginRight: moderateScale(10) }}
          />
          <TextInput
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Balas postingan..."
            onChangeText={this.onChangeComment}
            onSubmitEditing={this.onSubmitComment}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
            value={comment}
            multiline={true}
            editable={!disabled}
            selectTextOnFocus={!disabled}
            style={{
              flex: 1,
              marginRight: moderateScale(5),
              borderWidth: 0.7,
              borderRadius: moderateScale(10),
              borderColor: Colors.border,
              paddingHorizontal: moderateScale(10),
              paddingVertical: moderateScale(5)
            }}
          />
          {showSendButton ? (
            <TouchableOpacity
              onPress={this.onSubmitComment}
              style={{
                marginLeft: moderateScale(5),
                marginRight: moderateScale(5)
              }}
            >
              <Image
                source={Images.send}
                style={{
                  width: moderateScale(25),
                  height: moderateScale(20)
                }}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  }
}

export default CommentInput;
