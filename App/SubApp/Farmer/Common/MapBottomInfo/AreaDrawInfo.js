import React, { PureComponent } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";

import { ButtonPrimary } from "Components";
import { Images, FONTS } from "Themes";
import { moderateScale } from "Lib";
import AreaDrawInfoWrapper from "./AreaDrawInfoWrapper";

class AreaDrawInfo extends PureComponent {
  render() {
    const { isVisible, autoZoomIn } = this.props;
    if (!isVisible) return <View />;
    return (
      <AreaDrawInfoWrapper>
        <TouchableOpacity onPress={() => autoZoomIn()}>
          <Image
            source={Images.zoom_in}
            style={{
              width: moderateScale(60),
              height: moderateScale(60),
            }}
          />
        </TouchableOpacity>
        <Text style={FONTS.BODY_NORMAL}>posisi kamera peta kurang dekat</Text>
      </AreaDrawInfoWrapper>
    );
  }
}

export default AreaDrawInfo;
