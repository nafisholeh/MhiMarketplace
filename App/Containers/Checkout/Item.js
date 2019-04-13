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
        qty = 0 
      },
      userId
    } = this.props;
    if (!data) {
      return (<View />);
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
          { discount > 0 &&
            <Text style={styles.detailPrice}>
              {parseToRupiah(calcDiscount(price, discount))}
            </Text>
          }
          { discount === 0 &&
            <Text style={styles.detailPrice}>
              {parseToRupiah(price)}
            </Text>
          }
          <Text>
            {qty} {unit}
          </Text>
        </View>
      </View>
    );
  }
}

export default Item;
