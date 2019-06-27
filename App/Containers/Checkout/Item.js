import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';

import { parseToRupiah, isString, calcDiscount } from 'Lib';
import styles from './Styles';

class Item extends Component {
  render() {
    const {
      data,
      data: {
        product: { _id, title, photo, price, discount, unit }, 
        qty = 1
      },
      userId
    } = this.props;
    if (!data) {
      return (<View />);
    }
    const normalPrice = price * qty;
    const discountPrice = (price - calcDiscount(price, discount)) * qty;
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: photo }}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.detail}>
          <Text style={styles.detailTitle}>{title}</Text>
          { discount > 0 &&
            <Text>
              {parseToRupiah(discountPrice)}
            </Text>
          }
          { (discount === 0 || !discount) &&
            <Text>
              {parseToRupiah(normalPrice)}
            </Text>
          }
          <Text style={{ alignSelf: 'flex-end' }}>
            {qty} {unit}
          </Text>
        </View>
      </View>
    );
  }
}

export default Item;
