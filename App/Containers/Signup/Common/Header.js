import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { BackButton } from 'Components';
import { moderateScale } from 'Lib';

class Header extends Component {
  render() {
    const { title } = this.props;
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: moderateScale(10),
          marginTop: moderateScale(25),
          marginBottom: moderateScale(20),
        }}
      >
        <BackButton />
        <Text
          style={{
            fontFamily: 'CircularStd-Bold',
            fontSize: 20,
            color: 'rgba(0,0,0,0.68)',
          }}
        >
          {title}
        </Text>
      </View>
    );
  }
}

export default Header;
