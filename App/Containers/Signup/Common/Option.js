import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';

import { moderateScale } from 'Lib';
import { Colors, Images } from 'Themes';

class Option extends Component {
  render() {
    const { onPress, color, title, icon, styleWrapper } = this.props;
    return (
      <TouchableOpacity
        onPress={onPress}
        style={styleWrapper}
      >
        <View
          style={{
            ...styles.container,
            ...{ backgroundColor: color },
          }}
        >
          <Text
            style={{
              fontFamily: 'CircularStd-Bold',
              fontSize: 16,
              color: Colors.white,
            }}
          >
            {title || ''}
          </Text>
          <Image
            source={icon}
            tintColor={Colors.white}
            style={{ width: moderateScale(45), height: moderateScale(45) }}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(35),
    borderRadius: moderateScale(10),
  },
});

export default Option;
