import React, { Component } from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { string, number, oneOfType } from 'prop-types';

import { Images, Metrics } from 'Themes';

class ToolbarButton extends Component {
  render() {
    const { navigation, onPress, icon } = this.props;
    return (
      <TouchableOpacity 
        onPress={onPress}
        style={styles.container}>
        <Image source={icon} style={styles.image} />
      </TouchableOpacity>
    )
  }
}

ToolbarButton.propTypes = {
  icon: oneOfType([string, number]),
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Metrics.baseMargin,
  },
  image: {
    width: 25,
    height: 25,
  }
});

export default ToolbarButton;