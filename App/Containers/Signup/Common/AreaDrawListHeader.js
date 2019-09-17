import React, { Component } from 'react';
import { Text, Image } from 'react-native';

import { moderateScale } from 'Lib';
import { Colors } from 'Themes';

class AreaDrawListHeader extends Component {
  render() {
    const { title } = this.props;
    return (
      <Text
        style={{
          fontFamily: 'CircularStd-Book',
          fontSize: 16,
          color: Colors.black,
          marginLeft: moderateScale(10),
          marginTop: moderateScale(15),
          marginBottom: moderateScale(10),
        }}
        numberOfLines={1}
      >
        {title}
      </Text>
    );
  }
}

export default AreaDrawListHeader;
