import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import Avatar from './Avatar';
import { moderateScale } from 'Lib';
import { Fonts, Colors } from 'Themes';

export default class NotificationItem extends Component {
  state = {
    verb: ''
  }

  componentDidMount() {
    this.normalizeContent();  
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.context !== this.props.context) {
      this.normalizeContent();
    }
  }

  normalizeContent = () => {
    const { context } = this.props;
    let verb = '';
    if (context === 'reply_post') {
      verb = 'membalas postingan Anda';
    } else if (context === 'reply_comment') {
      verb = 'membalas komentar Anda';
    }
    this.setState({ verb });
  }

  onPress = () => {
    const { onPress, notifId, postId, commentId, subCommentId } = this.props;
    const highlightId = subCommentId || commentId;
    if (onPress) {
      onPress(notifId, postId, highlightId);
    }
  }

  render() {
    const { thumbnail, content, subjectName, hasSeen } = this.props;
    const { verb } = this.state;
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: moderateScale(10),
          paddingVertical: moderateScale(15),
          backgroundColor: hasSeen ? null : Colors.veggie_bg
        }}
        onPress={this.onPress}
      >
        <Avatar
          source={thumbnail}
          size="medium"
          style={{
            marginRight: moderateScale(10),
          }}
        />
        <Text
          style={{
            flex: 1,
            ...Fonts.TITLE_NORMAL,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>{subjectName}</Text>
          <Text> {verb}</Text>
          <Text style={{ fontWeight: "bold" }}> `{content}`</Text>
        </Text>
      </TouchableOpacity>
    );
  }
}
