import React, { Component } from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

import { Images } from 'Themes';

class ToolbarButton extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <TouchableOpacity 
        onPress={() => navigation.navigate('AddressInput')}>
        <Image source={Images.add} style={styles.image} />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    width: 25,
    height: 25,
  }
});

export default ToolbarButton;