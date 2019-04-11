import React, { Component } from 'react';
import { View, Text } from 'react-native';

import AddressCheckout from 'Containers/Address/AddressCheckout';

class Checkout extends Component {
  
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state
    return {
      title: 'Rekap Pesanan',
    }
  }
  
  render() {
    return (
      <View style={{flex:1}}>
        <AddressCheckout />
      </View>
    )
  }
}

export default Checkout;