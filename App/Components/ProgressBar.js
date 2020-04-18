import React, { PureComponent } from "react";
import { StyleSheet, View, Animated } from "react-native";

import { METRICS, Colors } from "Themes";

export default class ProgressBar extends PureComponent {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.progress !== nextProps.progress) {
      return true;
    }
  }
  componentWillMount() {
    const { progress } = this.props;
    this.animation = new Animated.Value(progress);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.progress !== this.props.progress) {
      Animated.timing(this.animation, {
        toValue: this.props.progress,
        duration: this.props.duration,
      }).start();
    }
  }

  render() {
    const { isRow } = this.props;
    const widthInterpolated = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["0%", "100%"],
      extrapolate: "clamp",
    });
    return (
      <View
        style={[
          { flexDirection: "row", height: METRICS.TINY },
          isRow ? undefined : { flex: 1 },
        ]}
      >
        <View style={{ flex: 1, borderColor: Colors.BORDER, borderWidth: 0 }}>
          <View
            style={[StyleSheet.absoluteFill, { backgroundColor: Colors.white }]}
          />
          <Animated.View
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: widthInterpolated,
              backgroundColor: Colors.PROGRESS_BAR_FILL,
            }}
          ></Animated.View>
        </View>
      </View>
    );
  }
}
