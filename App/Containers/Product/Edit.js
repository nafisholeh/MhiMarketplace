import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';

import Form from './Form';

class Edit extends Component {
  
  static navigationOptions = ({navigation}) => {
    const { params = {} } = navigation.state
    return {
      title: 'Ubah produk'
    }
  }

  render() {
    return (
      <Form isEdit />
    );
  }
}

export default Edit;
