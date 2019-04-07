import React, { Component } from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';
import { shape, number, string, func } from 'prop-types';

import { parseToRupiah } from 'Lib';
import { UpDownCounter } from 'Components';
import styles from './Styles';

class Item extends Component {
  
  onQtyChanged = qty => {
    const { onPress, data: { product: { _id } } } = this.props;
    onPress(_id, qty);
  }
  
  onCounterChanged = counter => {
    console.tron.log('Item onCounterChanged', counter);
  }
  
  render() {
    const { data, data: { product: { title, photo, price }, qty = 0 } } = this.props
    if (!data) {
      return <View />
    }
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: photo }}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.detail}>
          <Text style={styles.detailTitle}>{title}</Text>
          <Text style={styles.detailPrice}>{parseToRupiah(price)}</Text>
          <UpDownCounter
            initCounter={qty}
            onCounterChanged={this.onCounterChanged}
          />
        </View>
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