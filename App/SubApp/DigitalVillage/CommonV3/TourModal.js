/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Path, Svg } from 'react-native-svg';
import { any, number, func } from 'prop-types';

import {
  screenWidth,
  screenHeight,
  drawFullScreen,
  drawRoundedRectangle,
} from 'Lib';
import { FONTS, METRICS } from 'themes-v3';

export const MContext = React.createContext(); //exporting context object
const BORDER_RADIUS = 10;

class TourModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1, // current guide step displayed on screen
      isHighlightReady: false,
      isTourEnded: false,
      configs: [],
      currentConfigsIndex: 0,
    };
  }

  setHighlightMetricsCallback = (value) => {
    const { totalStep } = this.props;
    const {
      step,
      GuideView: newGuideView,
      isGuideBelowHighlight: newIsGuideBelowHighlight,
      width,
      height,
      pageX,
      pageY,
    } = value || {};
    const newHighlightPosition = { width, height, pageX, pageY };
    const roundedRectPath = drawRoundedRectangle(
      pageX,
      pageY,
      width,
      height,
      BORDER_RADIUS,
      BORDER_RADIUS,
      BORDER_RADIUS,
      BORDER_RADIUS
    );
    const canvasPath = drawFullScreen(screenWidth, screenHeight);
    const newSvgPath = canvasPath + roundedRectPath;
    const newConfigs = {
      step,
      GuideView: newGuideView,
      isGuideBelowHighlight: newIsGuideBelowHighlight,
      highlightPosition: newHighlightPosition,
      svgPath: newSvgPath,
    };
    this.setState(
      {
        configs: [...this.state.configs, newConfigs],
      },
      () => {
        if (this.state.configs.length === totalStep) {
          const currentConfigsIndex = this.state.configs.findIndex(
            ({ step: currStep }) => currStep === this.state.currentStep
          );
          this.setState({ currentConfigsIndex, isHighlightReady: true });
        }
      }
    );
  };

  onProceedClicked = () => {
    const { totalStep, onTourEnd } = this.props;
    const { currentStep } = this.state;
    const isHighlightReady = currentStep !== totalStep;
    const newStep = currentStep === totalStep ? -1 : currentStep + 1;
    if (newStep === -1) {
      this.setState({ isTourEnded: true }, () => {
        if (onTourEnd) onTourEnd();
      });

      return;
    }
    const currentConfigsIndex = this.state.configs.findIndex(
      ({ step: currStep }) => currStep === newStep
    );
    this.setState({
      isHighlightReady,
      currentConfigsIndex,
      currentStep: newStep,
    });
  };

  renderContent = () => {
    const { configs, currentConfigsIndex } = this.state;
    const {
      isGuideBelowHighlight,
      GuideView,
      highlightPosition,
      svgPath,
    } = configs[currentConfigsIndex];
    const { height, pageY } = highlightPosition || {};
    const top = isGuideBelowHighlight
      ? pageY + height + METRICS.LARGE
      : METRICS.EXTRA_HUGE;
    const bottom = isGuideBelowHighlight ? 0 : screenHeight - pageY;
    return (
      <>
        <Svg pointerEvents="none" width={screenWidth} height={screenHeight}>
          <Path
            ref={(ref) => {
              this.mask = ref;
            }}
            fill="rgba(0,0,0,0.9)"
            fillRule="evenodd"
            strokeWidth={1}
            d={svgPath}
          />
        </Svg>
        <View style={styles.proceedWrapper}>
          <TouchableOpacity onPress={this.onProceedClicked}>
            <Text style={FONTS.SEMIBOLD_MEDIUM_WHITE}>Lanjut</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            position: 'absolute',
            top,
            bottom,
            left: 0,
            right: 0,
            justifyContent: 'center',
          }}
        >
          {GuideView ? <GuideView /> : null}
        </View>
      </>
    );
  };

  render() {
    const { children } = this.props;
    const { isHighlightReady, isTourEnded } = this.state;
    return (
      <MContext.Provider
        value={{
          state: this.state,
          setHighlightMetrics: this.setHighlightMetricsCallback,
        }}
        {...this.props}
      >
        {children}
        <View style={styles.wrapper}>
          {isHighlightReady && !isTourEnded ? this.renderContent() : null}
        </View>
      </MContext.Provider>
    );
  }
}

const styles = StyleSheet.create({
  proceedWrapper: {
    position: 'absolute',
    right: METRICS.LARGE,
    top: METRICS.LARGE,
  },
  wrapper: { bottom: 0, left: 0, position: 'absolute', right: 0, top: 0 },
});

TourModal.propTypes = {
  children: any,
  totalStep: number,
  onTourEnd: func,
};

TourModal.defaultProps = {
  totalStep: 1,
};

export default TourModal;
