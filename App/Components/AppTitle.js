import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { moderateScale } from 'Lib';

class AppTitle extends Component {
  render() {
    return (
      <View>
        <Text
          style={{
            fontFamily: 'CircularStd-Bold',
            fontSize: 20,
            color: 'rgba(0,0,0,0.8)',
            marginHorizontal: moderateScale(15),
            marginBottom: moderateScale(15),
          }}
        >
          Fresh Food MHI
        </Text>
      </View>
    );
  }
}

export default AppTitle;
