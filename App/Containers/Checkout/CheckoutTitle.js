import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { string } from 'prop-types';

import { Metrics, Colors } from 'Themes';
import { moderateScale } from 'Lib';

class CheckoutTitle extends Component {
  render() {
    const { title } = this.props;
    return (
      <View
        style={{
          marginTop: moderateScale(10),
          marginBottom: moderateScale(10),
          marginHorizontal: moderateScale(15),
        }}
      >
        <Text
          style={{
            fontFamily: 'CircularStd-Book',
            fontSize: 16,
            color: Colors.black,
          }}
        >
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
