import React, { Component } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { func, number, string, oneOfType } from 'prop-types';

import { Metrics } from 'Themes';
import { moderateScale } from 'Lib';

class HeaderButton extends Component {
  render() {
    const { onPress, icon } = this.props;
    return (
      <TouchableOpacity
        onPress={onPress}
        style={styles.container}
        {...this.props}
      >
        <Image source={icon} style={styles.icon} />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Metrics.baseMargin,
  },
  icon: {
    width: moderateScale(30),
    height: moderateScale(30),
  }
});

HeaderButton.propTypes = {
  onPress: func.isRequired,
  icon: oneOfType([ number, string ]).isRequired,
};

export default HeaderButton;