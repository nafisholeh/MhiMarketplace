import React, { Component } from "react";
import { View, Text } from "react-native";
import { string, bool } from "prop-types";

import { Colors, FONTS, METRICS } from "Themes";
import BackButton from "./BackButton";

class HeaderTitleSecondary extends Component {
  render() {
    const { title, isEnableBack } = this.props;
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: METRICS.HUGE,
          paddingTop: METRICS.HUGE,
          paddingBottom: METRICS.MEDIUM,
          backgroundColor: Colors.white
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          {isEnableBack && <BackButton />}
          <Text
            style={{
              ...FONTS.PAGE_TITLE
            }}
          >
            {title}
          </Text>
        </View>
      </View>
    );
  }
}

HeaderTitleSecondary.propTypes = {
  title: string,
  isEnableBack: bool
};

export default HeaderTitleSecondary;
