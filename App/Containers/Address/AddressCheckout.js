import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';

import { Metrics } from 'Themes';

class AddressCheckout extends Component {
  onOpenList = () => {
    const { navigation } = this.props;
    navigation.navigate('AddressList');
  };
  
  render() {
    return (
      <TouchableOpacity onPress={this.onOpenList} style={styles.container}>
        <Text>Ini alamat</Text>
      </TouchableOpacity>
    )
  }
}

AddressCheckout.propTypes = {
  
};

const styles = StyleSheet.create({
  container: {
    height: 140,
    padding: Metrics.baseMargin,
  }
});

export default withNavigation(AddressCheckout);