import React, { Component } from 'react';
import { Text } from 'react-native';

import { moderateScale } from 'Lib';

class Title extends Component {
  render() {
    const { title, children } = this.props;
    return (
      <Text
        style={{
          fontFamily: 'CircularStd-Book',
          fontSize: 14,
          marginTop: moderateScale(15),
          marginBottom: moderateScale(10),
          marginHorizontal: moderateScale(18),
        }}
      >
        {title || children}
      </Text>
    );
  }
}

export default Title;
