import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { string } from 'prop-types';

import { moderateScale } from 'Lib';
import { Colors } from 'Themes';

class HeaderTitle extends Component {
  render() {
    const { title } = this.props;
    return (
      <View
        style={{
          paddingLeft: moderateScale(15),
          paddingVertical: moderateScale(15),
          backgroundColor: Colors.white,
          borderBottomWidth: 1,
          borderBottomColor: Colors.border,
        }}
      >
        <Text
          style={{
            fontFamily: 'CircularStd-Bold',
            fontSize: 16,
            color: 'rgba(0,0,0,0.8)',
          }}
        >
          {title}
        </Text>
      </View>
    );
  }
}

HeaderTitle.propTypes = {
  title: string,
};

export default HeaderTitle;
