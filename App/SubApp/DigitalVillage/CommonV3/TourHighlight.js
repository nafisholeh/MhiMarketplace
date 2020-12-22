import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { any, bool, number } from 'prop-types';

import { MContext } from './TourModal';
import { screenHeight } from 'Lib';

class TourHighlight extends PureComponent {
  isLayoutReady = false;

  handleLayout = (context) => {
    this.callbackToProvider(context);
  };

  callbackToProvider = (context) => {
    if (this.highlight) {
      const {
        GuideView,
        isGuideBelowHighlight,
        step,
        borderRadius,
        isNoHighlight,
      } = this.props;
      this.isLayoutReady = true;
      this.highlight.measure((x, y, width, height, pageX, pageY) => {
        if (isNoHighlight) {
          const noGuideBelowHiglight = false;
          const zeroWidth = 0;
          const zeroHeight = 0;
          const zeroPageX = 0;
          const zeroBorderRadius = 0;
          context.setHighlightMetrics({
            GuideView,
            noGuideBelowHiglight,
            step,
            width: zeroWidth,
            height: zeroHeight,
            pageX: zeroPageX,
            pageY: screenHeight,
            borderRadius: zeroBorderRadius,
            isNoHighlight,
          });
        }
        context.setHighlightMetrics({
          GuideView,
          isGuideBelowHighlight,
          step,
          width,
          height,
          pageX,
          pageY,
          borderRadius,
        });
      });
    }
  };

  render() {
    const { children } = this.props;
    return (
      <MContext.Consumer>
        {(context) => {
          return (
            <View
              ref={(ref) => {
                this.highlight = ref;
              }}
              onLayout={() => {
                this.handleLayout(context);
              }}
              {...this.props}
            >
              {children}
            </View>
          );
        }}
      </MContext.Consumer>
    );
  }
}

TourHighlight.propTypes = {
  children: any,
  isGuideBelowHighlight: bool,
  GuideView: any,
  step: number,
  borderRadius: number,
  isNoHighlight: bool,
};

export default TourHighlight;
