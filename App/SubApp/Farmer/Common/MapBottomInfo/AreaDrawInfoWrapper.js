import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { func } from "prop-types";

import { screenWidth } from "Lib";
import { Colors, METRICS } from "Themes";

class AreaDrawInfoWrapper extends Component {
  render() {
    const {
      height,
      borderRadius,
      children,
      styleWrapper,
      onPress,
      onLongPress,
      onPressOut,
      isLongPressMode,
    } = this.props;
    return (
      <View
        style={{
          ...{
            flex: 1,
            width: screenWidth,
            height: height || 140,
            borderRadius: borderRadius || 4,
            backgroundColor: Colors.white,
          },
          ...styleWrapper,
        }}
      >
        {isLongPressMode ? (
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
              width: screenWidth,
              height: height || 140,
              borderRadius: borderRadius || 4,
              backgroundColor: Colors.white,
              paddingVertical: METRICS.MEDIUM,
            }}
            onLongPress={onLongPress}
            onPressOut={onPressOut}
            delayLongPress={1500}
          >
            {children}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
              width: screenWidth,
              height: height || 140,
              borderRadius: borderRadius || 4,
              backgroundColor: Colors.white,
              paddingVertical: METRICS.MEDIUM,
            }}
            onPress={onPress}
          >
            {children}
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

AreaDrawInfoWrapper.propTypes = {
  onPress: func,
};

export default AreaDrawInfoWrapper;
