import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Path, Svg } from 'react-native-svg';
import { any } from 'prop-types';

import {
  screenWidth,
  screenHeight,
  drawFullScreen,
  drawRoundedRectangle,
} from 'Lib';

export const MContext = React.createContext(); //exporting context object
const BORDER_RADIUS = 10;

class TourModal extends Component {
  constructor(props) {
    super(props);
    this.state = { isHighlightReady: '', renderedTourGuidePath: null };
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
      renderedTourGuidePath,
    });
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
            <Svg pointerEvents="none" width={screenWidth} height={screenHeight}>
              <Path
                ref={(ref) => {
                  this.mask = ref;
                }}
                fill="rgba(0,0,0,0.8)"
                fillRule="evenodd"
                strokeWidth={1}
                d={renderedTourGuidePath}
              />
            </Svg>
          ) : null}
        </View>
      </MContext.Provider>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: { bottom: 0, left: 0, position: 'absolute', right: 0, top: 0 },
});

TourModal.propTypes = {
  children: any,
};

export default TourModal;
