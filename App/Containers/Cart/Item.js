import React, { Component } from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';
import { shape, number, string, func } from 'prop-types';

import { parseToRupiah } from 'Lib';

class Item extends Component {
  
  onQtyChanged = qty => {
    const { onPress, data: { product: { _id } } } = this.props;
    onPress(_id, qty);
  }
  
  render() {
    const { data, data: { product: { title, photo } } } = this.props
    if (!data) {
      return <View />
    }
    return (
      <View style={{ height: 100 }}>
        <Image source={{ uri: photo }} style={{width:60, height:60}}/>
        <Text>{title}</Text>
      </View>
    )
  }
}

Item.propTypes = {
  data: shape({
    product: {
      _id: string,
      title: string,
      photo: string,
      price: number,
      discount: number,
    },
    qty: number,
  }),
  userId: string.isRequired,
  onPress: func.isRequired,
}

export default Item;