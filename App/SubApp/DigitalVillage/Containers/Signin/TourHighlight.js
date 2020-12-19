import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { any } from 'prop-types';

import { MContext } from './TourModal';

class TourHighlight extends PureComponent {
  handleLayout = (context) => {
    if (this.highlight) {
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
};

export default TourHighlight;
