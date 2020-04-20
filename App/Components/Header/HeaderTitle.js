import React, { Component } from "react";
import { View, Text } from "react-native";
import { string, bool } from "prop-types";

import { moderateScale } from "Lib";
import { Colors, Images } from "Themes";
import BackButton from "./BackButton";
import HeaderButton from "./HeaderButton";

class HeaderTitle extends Component {
  render() {
    const {
      title,
      isEnableBack,
      isEnableRightNav,
      onRightNavigate,
      iconRightNav,
      loading,
    } = this.props;
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: moderateScale(15),
          paddingVertical: moderateScale(15),
          backgroundColor: Colors.white,
          borderBottomWidth: 1,
          borderBottomColor: Colors.BORDER,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {isEnableBack && <BackButton />}
          <Text
            style={{
              fontFamily: "CircularStd-Bold",
              fontSize: 16,
              color: "rgba(0,0,0,0.8)",
            }}
          >
            {title}
          </Text>
        </View>
        {isEnableRightNav && (
          <HeaderButton
            onPress={onRightNavigate}
            icon={iconRightNav}
            loading={loading}
          />
        )}
      </View>
    );
  }
}

HeaderTitle.propTypes = {
  title: string,
  isEnableBack: bool,
  isEnableRightNav: bool,
};

export default HeaderTitle;
