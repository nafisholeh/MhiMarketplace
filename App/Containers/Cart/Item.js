import React, { Component } from 'react';
import { Text, Image, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { shape, number, string, func } from 'prop-types';
import { debounce } from 'throttle-debounce';
import { Mutation, compose } from 'react-apollo';
import update from 'immutability-helper';

import AppConfig from 'Config/AppConfig';
import { parseToRupiah, isString } from 'Lib';
import { UpDownCounter } from 'Components';
import { FETCH_CART } from 'GraphQL/Cart/Query';
import { UPDATE_CART_ITEM, DELETE_CART_ITEM } from 'GraphQL/Cart/Mutation';
import styles from './Styles';
import { Images } from 'Themes';
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
  
  onItemDeleted = (cache, { data }) => {
    const { userId, data: { product: { _id: productId }} } = this.props;
    const { cart } = cache.readQuery({ query: FETCH_CART, variables: { user_id: userId } });
    if (!cart) return null;
    const deletedIndex = cart.findIndex(n => n.product._id === productId);
    cache.writeQuery({
      query: FETCH_CART,
      variables: { user_id: userId },
      data: { cart: update(cart, { $splice: [[deletedIndex, 1]] }) }
    });
  }
  
  render() {
    const { data, data: { product: { _id, title, photo, price }, qty = 0 }, userId } = this.props
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
        <Mutation
          mutation={DELETE_CART_ITEM}
          variables={{ user_id: userId, product_id: _id }}
          update={this.onItemDeleted}
          onError={(error) => {}}
          ignoreResults={false}
          errorPolicy='all'>
          { (deleteCartItem, {loading, error, data}) => {
            console.tron.display({
              name: "DELETE_CART_ITEM",
              value: {
                deleteCartItem, loading, error, data
              }
            })
            if (loading) {
              return (
                <ActivityIndicator size="small" />
              )
            }
            return (
              <TouchableOpacity onPress={() => deleteCartItem()}>
                <Image source={Images.delete} style={{ width: 25, height: 25 }} />
              </TouchableOpacity>
            )
          }}
        </Mutation>
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