import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { BackButton } from 'Components';
import { moderateScale } from 'Lib';
import { Colors } from 'Themes';

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
        <BackButton color={Colors.white} isShowShadow />
        <Text
          style={{
            fontFamily: 'CircularStd-Bold',
            fontSize: 20,
            color: Colors.white,
            textShadowColor: 'rgba(255, 255, 255, 0.8)',
            textShadowOffset: {width: -2, height: 2},
            textShadowRadius: 10
          }}
        >
          {title}
        </Text>
      </View>
    );
  }
}

export default Header;
