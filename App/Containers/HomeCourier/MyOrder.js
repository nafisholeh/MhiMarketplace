import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { bool, func } from 'prop-types';
import { withNavigation } from 'react-navigation';

import { Colors } from 'Themes';

class MyOrder extends Component {
  onNavigate = () => {
    const { onNavigate } = this.props;
    if (onNavigate) onNavigate();
  };

  render() {
    return (
      <TouchableOpacity
        onPress={this.onNavigate}
        style={{
          borderWidth: 0.5,
          borderColor: Colors.brown_light,
          borderRadius: 4,
          elevation: 2,
          height: 100,
          margin: 10,
          padding: 15,
          justifyContent: 'space-between'
        }}
      >
        <Text>Pesanan Saya</Text>
        <Text
          style={{
            textAlign: 'right',
          }}
        >
          12
        </Text>
      </TouchableOpacity>
    );
  }
}

MyOrder.propTypes = {
  onNavigate: func,
};

export default MyOrder;
