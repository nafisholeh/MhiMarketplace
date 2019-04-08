import React, { Component } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { func, number, string, oneOf } from 'prop-types';

import { Metrics } from 'Themes';

class HeaderButton extends Component {
  render() {
    const { onPress, icon } = this.props;
    return (
      <React.Fragment>
        <TouchableOpacity onPress={onPress} style={styles.container}>
          <Image source={icon} style={styles.icon} />
        </TouchableOpacity>
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Metrics.baseMargin,
  },
  icon: {
    width: 30,
    height: 30,
  }
});

HeaderButton.propTypes = {
  onPress: func.isRequired,
  icon: oneOf([ number, string ]).isRequired,
};

export default HeaderButton;