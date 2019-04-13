import React, { Component } from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

import { Images, Metrics } from 'Themes';

class ToolbarButton extends Component {
  render() {
    const { navigation, onPress } = this.props;
    return (
      <TouchableOpacity 
        onPress={onPress}
        style={styles.container}>
        <Image source={Images.add} style={styles.image} />
      </TouchableOpacity>
    )
  }
}

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