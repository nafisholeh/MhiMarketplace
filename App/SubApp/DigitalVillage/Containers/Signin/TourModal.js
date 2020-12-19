/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Path, Svg } from 'react-native-svg';
import { any, bool, func } from 'prop-types';

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
      isHighlightReady: false,
      highlightPosition: null,
      renderedTourGuidePath: null,
    };
  }

  setHighlightMetricsCallback = (value) => {
    const { width, height, pageX, pageY } = value || {};
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
    const renderedTourGuidePath = canvasPath + roundedRectPath;
    this.setState({
      isHighlightReady: value ? true : false,
      highlightPosition: value,
      renderedTourGuidePath,
    });
  };

  onProceedClicked = () => {
    this.setState({ isHighlightReady: false });
  };

  renderContent = () => {
    const { isContentBelowHighlight, GuideView } = this.props;
    const { highlightPosition } = this.state;
    const { height, pageY } = highlightPosition || {};
    const top = isContentBelowHighlight
      ? pageY + height + METRICS.LARGE
      : METRICS.EXTRA_HUGE;
    const bottom = isContentBelowHighlight ? 0 : screenHeight - pageY;
    return (
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
    );
  };

  render() {
    const { children } = this.props;
    const { renderedTourGuidePath, isHighlightReady } = this.state;
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
          {isHighlightReady ? (
            <>
              <Svg
                pointerEvents="none"
                width={screenWidth}
                height={screenHeight}
              >
                <Path
                  ref={(ref) => {
                    this.mask = ref;
                  }}
                  fill="rgba(0,0,0,0.9)"
                  fillRule="evenodd"
                  strokeWidth={1}
                  d={renderedTourGuidePath}
                />
              </Svg>
              <View style={styles.proceedWrapper}>
                <TouchableOpacity onPress={this.onProceedClicked}>
                  <Text style={FONTS.SEMIBOLD_MEDIUM_WHITE}>Lanjut</Text>
                </TouchableOpacity>
              </View>
              {this.renderContent()}
            </>
          ) : null}
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
  GuideView: func,
  isContentBelowHighlight: bool,
};

export default TourModal;
