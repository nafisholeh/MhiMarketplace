import React, { PureComponent } from "react";
import { Image, Text } from "react-native";

import { MAP_DRAW_STATE } from "Config/AppConfig";
import { Images, FONTS } from "Themes";
import { moderateScale } from "Lib";
import AreaDrawInfoWrapper from "./AreaDrawInfoWrapper";

class AreaDrawInfo extends PureComponent {
  render() {
    const { drawingState, autoZoomIn } = this.props;
    const image = Images[drawingState] || Images.map_zoom_in;
    return (
      <AreaDrawInfoWrapper onPress={() => autoZoomIn()}>
        <Image
          source={image}
          style={{
            width: moderateScale(60),
            height: moderateScale(60),
          }}
        />
        <Text style={FONTS.BODY_NORMAL}>posisi kamera peta kurang dekat</Text>
      </AreaDrawInfoWrapper>
    );
  }
}

export default AreaDrawInfo;
