import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { func } from "prop-types";
import { DotIndicator } from "react-native-indicators";

import { screenWidth } from "Lib";
import { Colors, METRICS } from "Themes";
import { ProgressBar } from "Components";

class AreaDrawInfoWrapper extends Component {
  state = {
    progress: 0,
  };
  longPressAnimationInterval = null;
  isLongPress = false;

  componentDidUpdate(prevProps) {
    const { showFullProgress } = this.props;
    if (prevProps.showFullProgress !== showFullProgress) {
      this.setState({ progress: showFullProgress ? 1 : 0 });
    }
  }

  startLongPressAnimation = () => {
    this.longPressAnimationInterval = setInterval(() => {
      this.setState(
        (state) => ({ progress: state.progress + 0.25 }),
        () => {
          if (this.state.progress > 1) {
            clearInterval(this.longPressAnimationInterval);
          }
        }
      );
    }, 500);
  };

  stopLongPressAnimation = () => {
    clearInterval(this.longPressAnimationInterval);
    this.setState({ progress: 0 });
  };

  componentWillUnmount() {
    this.stopLongPressAnimation();
  }

  render() {
    const {
      height,
      borderRadius,
      children,
      styleWrapper,
      onPress,
      onLongPress,
      isLongPressMode,
      isLoading,
    } = this.props;
    const { progress } = this.state;
    return (
      <View
        style={{
          ...{
            flex: 1,
            width: screenWidth,
            height: height || METRICS.AREA_INFO_HEIGHT,
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
          onPressIn={() => {
            this.startLongPressAnimation();
          }}
          onPressOut={() => {
            if (this.isLongPress) {
              onLongPress();
            }
            this.stopLongPressAnimation();
          }}
          onPress={() => {
            this.isLongPress = false;
            if (onPress) onPress();
          }}
          onLongPress={() => {
            if (isLongPressMode && onLongPress) {
              this.isLongPress = true;
            }
          }}
          disabled={isLoading}
          delayLongPress={2000}
        >
          {isLoading ? (
            <DotIndicator count={4} size={9} color={Colors.LOADING_INDICATOR} />
          ) : (
            children
          )}
        </TouchableOpacity>
        <ProgressBar progress={progress} duration={250} isRow />
      </View>
    );
  }
}

AreaDrawInfoWrapper.propTypes = {
  onPress: func,
};

export default AreaDrawInfoWrapper;
