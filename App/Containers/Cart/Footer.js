import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { arrayOf, number, shape } from 'prop-types';
import { withNavigation } from 'react-navigation';

import { parseToRupiah, calcDiscount } from 'Lib';
import { Colors } from 'Themes';

class Footer extends Component {

  startCheckout = () => {
    const { navigation } = this.props;
    navigation.navigate('Checkout');
  };
  
  calcGrossTotal = () => {
    const { data } = this.props;
    return data.reduce(
      (total, item) => 
        total + (item.qty * calcDiscount(
          item.product.price,
          item.product.discount
        ))
    , 0); 
  }

  render() {
    const grossPriceTotal = this.calcGrossTotal();
    return (
      <View style={{
          backgroundColor: Colors.white,
          borderTopWidth: 0.4,
          borderTopColor: Colors.brown_light
        }}>
        <View style={{ padding: 15 }}>
          <Text style={{ fontSize: 16 }}>Total</Text>
          <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
            {parseToRupiah(grossPriceTotal)}
          </Text>
        </View>
        <TouchableOpacity
          onPress={this.startCheckout}
          style={{
            height: 50, backgroundColor: Colors.green_light,
            alignItems: 'center', justifyContent: 'center'
          }}
          >
          <Text style={{color: 'white'}}>
            Checkout
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

Footer.propTypes = {
  data: arrayOf(
    shape({
      qty: number,
      product: {
        price: number,
        discount: number,
      }
    })
  ),
};

export default withNavigation(Footer);