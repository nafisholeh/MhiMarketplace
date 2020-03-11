import React, { Component } from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import { string } from "prop-types";

import { FONTS, Colors } from "Themes";
import { moderateScale } from "Lib";

class FloatNavigation extends Component {
  onPress = () => {
    const { onPress } = this.props;
    if (onPress) {
      onPress();
    }
  };

  render() {
    const { style, icon, title } = this.props;
    return (
      <TouchableOpacity
        onPress={this.onPress}
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: moderateScale(8),
          paddingHorizontal: moderateScale(15),
          borderRadius: moderateScale(5),
          backgroundColor: Colors.text_light,
          ...style
        }}
      >
        <Image
          source={icon}
          style={{
            width: moderateScale(17),
            height: moderateScale(13),
            marginRight: moderateScale(20),
            tintColor: Colors.white
          }}
        />
        <Text
          style={{
            ...FONTS.BODY_SMALL,
            color: Colors.white
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default FloatNavigation;
