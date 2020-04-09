import React, { Component } from "react";
import { View } from "react-native";
import { func } from "prop-types";

import { screenWidth } from "Lib";
import { Colors, METRICS } from "Themes";

class AreaDrawInfoWrapper extends Component {
  render() {
    const { height, borderRadius, children, styleWrapper } = this.props;
    return (
      <View
        style={{
          ...{
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            width: screenWidth,
            height: height || 140,
            borderRadius: borderRadius || 4,
            backgroundColor: Colors.white,
            paddingVertical: METRICS.MEDIUM,
          },
          ...styleWrapper,
        }}
      >
        {children}
      </View>
    );
  }
}

AreaDrawInfoWrapper.propTypes = {
  onPress: func,
};

export default AreaDrawInfoWrapper;
