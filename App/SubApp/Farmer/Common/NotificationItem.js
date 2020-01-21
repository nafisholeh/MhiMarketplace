import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Avatar from './Avatar';
import { moderateScale } from 'Lib';
import { Fonts } from 'Themes';

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
    const { context, content, subjectName } = this.props;
    let verb = '';
    if (context === 'reply_post') {
      verb = 'membalas postingan Anda';
    } else if (context === 'reply_comment') {
      verb = 'membalas komentar Anda';
    }
    this.setState({ verb });
  }

  render() {
    const { thumbnail, content, subjectName } = this.props;
    const { verb } = this.state;
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: moderateScale(10),
          paddingVertical: moderateScale(15),
        }}
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
      </View>
    );
  }
}
