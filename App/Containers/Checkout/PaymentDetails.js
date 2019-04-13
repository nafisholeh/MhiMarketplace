import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { Colors, Metrics } from 'Themes';
import styles from './Styles';
import { parseToRupiah } from 'Lib';

class PaymentDetails extends Component {
  render() {
    return (
      <View
        style={{
          borderTopColor: Colors.brown_light,
          borderTopWidth: 0.5,
          marginTop: Metrics.baseMargin,
          paddingTop: Metrics.doubleBaseMargin,
        }}
      >
        <View style={styles.paymentDetail}>
          <Text>Total diskon</Text>
          <Text>{parseToRupiah(100000)}</Text>
        </View>
        <View style={styles.paymentDetail}>
          <Text>Harga Kurir</Text>
          <Text>{parseToRupiah(100000)}</Text>
        </View>
        <View style={{ marginHorizontal: Metrics.baseMargin }}>
          <Text>Total yang harus dibayarkan</Text>
          <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'right' }}>
            {parseToRupiah(100000)}
          </Text>
        </View>
      </View>
    );
  }
}

export default PaymentDetails;
