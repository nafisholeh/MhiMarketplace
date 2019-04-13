import React, { Component } from 'react';
import { View, Text } from 'react-native';

import AddressCheckout from 'Containers/Address/AddressCheckout';
import CheckoutList from './CheckoutList';
import DeliveryOptions from './DeliveryOptions';

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
        <CheckoutList />
        <DeliveryOptions />
      </View>
    )
  }
}

export default Checkout;