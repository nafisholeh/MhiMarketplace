import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import { Colors, Images } from 'Themes';
import { moderateScale } from 'Lib';

class Menu extends Component {
  render() {
    const { title, icon, onPress } = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          if(onPress) onPress();
        }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: moderateScale(15),
          marginBottom: moderateScale(25),
        }}
      >
        <Image
          source={icon}
          style={{
            height: moderateScale(25),
            width: moderateScale(25),
            marginRight: moderateScale(15),
            resizeMode: 'contain',
          }}
        />
      <Text
        style={{
          fontFamily: 'CircularStd-Book',
          fontSize: 16,
          color: Colors.black,
        }}
      >
        {title}
      </Text>
      </TouchableOpacity>
    );
  }
}

export default Menu;
