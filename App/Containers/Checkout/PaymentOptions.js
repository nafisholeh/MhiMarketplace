import React, { Component } from 'react';
import { View, Text, CheckBox } from 'react-native';

import { Metrics } from 'Themes';
import { RadioButton } from 'Components';

class PaymentOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cod: true,
      transfer: false,
    }
  }
  
  toggleCod = state => {
    this.setState((prevState) => {
      return {
        cod: !prevState.cod,
        transfer: prevState.cod,
      }
    });
  };
  
  toggleTransfer = state => {
    this.setState((prevState) => {
      return {
        transfer: !prevState.transfer,
        cod: prevState.transfer,
      }
    });
  };
  
  render() {
    const { cod, transfer } = this.state;
    return (
      <View
        style={{
          marginHorizontal: Metrics.baseMargin,
          marginTop: Metrics.smallMargin,
          marginBottom: Metrics.baseMargin,
        }}
      >
        <View 
          style={{
            flexDirection: 'row',
            marginBottom: Metrics.baseMargin,
            alignItems: 'center',
          }}>
          <RadioButton
            onPress={this.toggleCod}
            isSelected={cod}
            styleContainer={{ marginRight: Metrics.baseMargin }}
          />
          <Text>Bayar nanti (COD)</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: Metrics.baseMargin,
            alignItems: 'center',
          }}>
          <RadioButton
            onPress={this.toggleTransfer}
            isSelected={transfer}
            styleContainer={{ marginRight: Metrics.baseMargin }}
          />
          <Text>Transfer</Text>
        </View>
      </View>
    );
  }
}

export default PaymentOptions;
