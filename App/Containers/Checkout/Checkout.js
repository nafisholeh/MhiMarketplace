import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';

import CheckoutTitle from './CheckoutTitle';
import AddressCheckout from 'Containers/Address/AddressCheckout';
import CheckoutList from './CheckoutList';
import DeliveryOptions from './DeliveryOptions';
import PaymentOptions from './PaymentOptions';
import { Metrics } from 'Themes';

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
        <ScrollView style={{ flex: 1, marginBottom: Metrics.doubleBaseMargin }}>
          <CheckoutTitle title="Alamat Pengiriman" />
          <AddressCheckout />
          <CheckoutTitle title="Pesanan Anda" />
          <CheckoutList />
          <CheckoutTitle title="Jadwal Pengiriman" />
          <DeliveryOptions />
          <CheckoutTitle title="Pembayaran" />
          <PaymentOptions />
        </ScrollView>
      </View>
    )
  }
}

export default Checkout;