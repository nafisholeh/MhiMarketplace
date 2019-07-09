import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';

import Form from './Form';

class Add extends Component {
  
  static navigationOptions = ({navigation}) => {
    const { params = {} } = navigation.state
    return {
      title: 'Produk Baru'
    }
  }

  render() {
    return (
      <Form isEdit={false} />
    );
  }
}

export default Add;