import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { string, number, shape, arrayOf } from 'prop-types';

import styles from './Styles';

class Item extends Component {
  render() {
    const { data: { _id: orderId, user_id, time, total_cost, products } } = this.props;
    const { name } = user_id || {};
    return (
      <View style={styles.item__container}>
        <View style={styles.item__view}>
          <Text>{name}</Text>
          <Text>{orderId}</Text>
        </View>
      </View>
    );
  }
}

Item.propTypes = {
  data: shape({
    _id: string,
    user_id: shape({
      name: string,
    }),
    time: string,
    total_cost: number,
    products: arrayOf(shape({
      _id: string,
      qty: number,
    })),
  }),
};

export default Item;
