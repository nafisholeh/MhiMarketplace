import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { any, bool } from 'prop-types';

import { MContext } from './TourModal';

class TourHighlight extends PureComponent {
  handleLayout = (context) => {
    if (this.highlight) {
      const { GuideView, isGuideBelowHighlight } = this.props;
      context.setInitialProps({ GuideView, isGuideBelowHighlight });
      this.highlight.measure((x, y, width, height, pageX, pageY) => {
        context.setHighlightMetrics({ width, height, pageX, pageY });
      });
    }
  };

  render() {
    const { children } = this.props;
    return (
      <MContext.Consumer>
        {(context) => (
          <View
            ref={(ref) => {
              this.highlight = ref;
            }}
            onLayout={() => this.handleLayout(context)}
            {...this.props}
          >
            {children}
          </View>
        )}
      </MContext.Consumer>
    );
  }
}

TourHighlight.propTypes = {
  children: any,
  isGuideBelowHighlight: bool,
  GuideView: any,
};

export default TourHighlight;
