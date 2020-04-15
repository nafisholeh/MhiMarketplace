import React, { PureComponent } from "react";
import { Image, Text } from "react-native";

import { MAP_DRAW_STATE, MAP_DRAW_STATE_INFO } from "Config/AppConfig";
import { Images, FONTS } from "Themes";
import { moderateScale } from "Lib";
import AreaDrawInfoWrapper from "./AreaDrawInfoWrapper";

class AreaDrawInfo extends PureComponent {
  state = {
    info: null,
  };

  componentDidMount() {
    this.updateInfo();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.drawingState !== this.props.drawingState) {
      this.updateInfo();
    }
  }

  updateInfo = () => {
    const { drawingState } = this.props;
    const mapDrawStateInfoKey = Object.keys(MAP_DRAW_STATE).find(
      (key) => MAP_DRAW_STATE[key] === drawingState
    );
    this.setState({ info: MAP_DRAW_STATE_INFO[mapDrawStateInfoKey] });
  };

  onPress = () => {
    const { drawingState, autoZoomIn, putPivotMarker } = this.props;
    switch (drawingState) {
      case MAP_DRAW_STATE.NOT_READY:
        autoZoomIn();
      case MAP_DRAW_STATE.DRAWING_PIVOT:
        putPivotMarker();
      default: {
      }
    }
  };

  render() {
    const { drawingState } = this.props;
    const { info } = this.state;
    const image = Images[drawingState] || Images.map_zoom_in;
    return (
      <AreaDrawInfoWrapper onPress={this.onPress}>
        <Image
          source={image}
          style={{
            width: moderateScale(60),
            height: moderateScale(60),
          }}
        />
        <Text style={FONTS.BODY_NORMAL}>{info || ""}</Text>
      </AreaDrawInfoWrapper>
    );
  }
}

export default AreaDrawInfo;
