import React, { Component } from "react";
import { View } from "react-native";
import StepIndicator from "react-native-step-indicator";

import { METRICS, Colors, Images } from "Themes";
import { ImageRadius } from "Components";

const customStyles = {
  stepIndicatorSize: METRICS.LARGE,
  currentStepIndicatorSize: METRICS.LARGE,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeWidth: 10,
  stepStrokeCurrentColor: Colors.green_light,
  stepStrokeFinishedColor: Colors.green_light,
  stepStrokeUnFinishedColor: "#ffffff",
  separatorFinishedColor: Colors.green_light,
  separatorUnFinishedColor: Colors.green_light,
  stepIndicatorFinishedColor: Colors.green_light,
  stepIndicatorUnFinishedColor: "#ffffff",
  stepIndicatorCurrentColor: Colors.green_light,
};

export default class SignupIndicator extends Component {
  render() {
    const { currentPosition = 0 } = this.props;
    return (
      <View style={{ marginVertical: METRICS.SMALL }}>
        <StepIndicator
          customStyles={customStyles}
          currentPosition={currentPosition}
          stepCount={4}
          renderStepIndicator={({ position, stepStatus }) => {
            if (stepStatus === "finished") {
              return (
                <ImageRadius
                  source={Images.check_flat}
                  style={{
                    width: METRICS.SMALL,
                    height: METRICS.SMALL,
                    tintColor: Colors.white,
                  }}
                />
              );
            }
            return (
              <View
                style={{
                  width: METRICS.MEDIUM,
                  height: METRICS.MEDIUM,
                  borderRadius: METRICS.MEDIUM / 2,
                  backgroundColor:
                    position === currentPosition
                      ? Colors.green_light
                      : Colors.disabled_light,
                }}
              ></View>
            );
          }}
        />
      </View>
    );
  }
}
