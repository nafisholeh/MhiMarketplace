import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { string } from 'prop-types';

import { Metrics } from 'Themes';

class CheckoutTitle extends Component {
  render() {
    const { title } = this.props;
    return (
      <View
        style={{
          paddingHorizontal: Metrics.baseMargin,
          marginTop: Metrics.baseMargin,
          marginBottom: Metrics.smallMargin
        }}
      >
        <Text style={{ fontWeight: 'bold' }}>
          {title}
        </Text>
      </View>
    );
  }
}

CheckoutTitle.propTypes = {
  title: string,
};

export default CheckoutTitle;
