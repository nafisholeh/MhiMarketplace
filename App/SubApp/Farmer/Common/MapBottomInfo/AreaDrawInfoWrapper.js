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
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            width: screenWidth,
            height: height || 140,
            paddingVertical: METRICS.MEDIUM,
          }}
          onPress={() => {
            if (onPress) onPress();
          }}
          onLongPress={() => {
            if (isLongPressMode && onLongPress) {
              onLongPress();
            }
          }}
          delayLongPress={1500}
        >
          {children}
        </TouchableOpacity>
      </View>
    );
  }
}

AreaDrawInfoWrapper.propTypes = {
  onPress: func,
};

export default AreaDrawInfoWrapper;
