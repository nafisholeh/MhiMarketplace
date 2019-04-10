import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { number, shape } from 'prop-types';
import { withNavigation } from 'react-navigation';

import { parseToRupiah } from 'Lib';
import { Colors } from 'Themes';
import { getCartTotalGrossPrice } from 'Redux/CartRedux';

class Footer extends Component {

  startCheckout = () => {
    const { navigation } = this.props;
    navigation.navigate('Checkout');
  };

  render() {
    const { grossPriceTotal } = this.props;
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
  grossPriceTotal: number,
};

const mapStateToProps = createStructuredSelector({
  grossPriceTotal: getCartTotalGrossPrice(),
});

export default connect(mapStateToProps, null)(withNavigation(Footer));