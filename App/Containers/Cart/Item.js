import React, { Component } from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';
import { shape, number, string, func } from 'prop-types';
import { debounce } from 'throttle-debounce';
import { compose } from 'react-apollo';

import AppConfig from 'Config/AppConfig';
import { parseToRupiah, isString } from 'Lib';
import { UpDownCounter } from 'Components';
import { UPDATE_CART_ITEM } from 'GraphQL/Cart/Mutation';
import styles from './Styles';
var _ = require('lodash');

class Item extends Component {
  constructor(props) {
    super(props);
    this.debounceCartItemUpdate = 
      debounce(
        AppConfig.debounceInterval, 
        counter => this.onCartClicked(counter)
      );
  }
  
  onCounterChanged = counter => {
    this.debounceCartItemUpdate(isString(counter) ? parseInt(counter, 10) : counter);
  }
  
  onCartClicked = counter => {
    const { updateCartItem, data: { product: { _id } }, userId } = this.props;
    updateCartItem({
      user_id: userId,
      product_id: _id,
      qty: counter,
    })
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
}

export default compose(UPDATE_CART_ITEM)(Item);