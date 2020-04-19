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
    const {
      drawingState,
      autoZoomIn,
      putPivotMarker,
      ontoNextForm,
    } = this.props;
    switch (drawingState) {
      case MAP_DRAW_STATE.NOT_READY:
        if (autoZoomIn) autoZoomIn();
        break;
      case MAP_DRAW_STATE.DRAWING:
      case MAP_DRAW_STATE.DRAWING_QUALIFIED:
        if (putPivotMarker) putPivotMarker();
        break;
      case MAP_DRAW_STATE.DRAWING_FINISHED:
        if (ontoNextForm) ontoNextForm();
        break;
    }
  };

  onLongPress = () => {
    const { drawingState, finishDrawing } = this.props;
    if (drawingState === MAP_DRAW_STATE.DRAWING_QUALIFIED) {
      finishDrawing();
    }
  };

  render() {
    const { drawingState } = this.props;
    const { info } = this.state;
    const image = Images[drawingState] || Images.map_zoom_in;
    return (
      <AreaDrawInfoWrapper
        onPress={this.onPress}
        onLongPress={this.onLongPress}
        isLongPressMode={drawingState === MAP_DRAW_STATE.DRAWING_QUALIFIED}
        showFullProgress={drawingState === MAP_DRAW_STATE.DRAWING_FINISHED}
      >
        <Image
          source={image}
          style={{
            width: moderateScale(60),
            height: moderateScale(60),
          }}
        />
        {Array.isArray(info) ? (
          info.map((text) => (
            <Text style={FONTS.BODY_NORMAL}>{text || ""}</Text>
          ))
        ) : (
          <Text style={FONTS.BODY_NORMAL}>{info || ""}</Text>
        )}
      </AreaDrawInfoWrapper>
    );
  }
}

export default AreaDrawInfo;
