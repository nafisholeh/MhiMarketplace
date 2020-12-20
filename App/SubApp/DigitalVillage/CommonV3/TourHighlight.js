import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { any, bool, number } from 'prop-types';

import { MContext } from './TourModal';

class TourHighlight extends PureComponent {
  isLayoutReady = false;

  handleLayout = (context) => {
    this.callbackToProvider(context);
  };

  callbackToProvider = (context) => {
    if (this.highlight) {
      const { GuideView, isGuideBelowHighlight, step } = this.props;
      this.isLayoutReady = true;
      this.highlight.measure((x, y, width, height, pageX, pageY) => {
        context.setHighlightMetrics({
          GuideView,
          isGuideBelowHighlight,
          step,
          width,
          height,
          pageX,
          pageY,
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
              onLayout={() => this.handleLayout(context)}
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
};

export default TourHighlight;
