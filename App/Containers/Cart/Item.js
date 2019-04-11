import React, { Component } from 'react';
import { Text, Image, View, TouchableOpacity, ActivityIndicator, CheckBox } from 'react-native';
import { shape, number, string, func, arrayOf } from 'prop-types';
import { debounce } from 'throttle-debounce';
import { Mutation, compose } from 'react-apollo';
import { connect } from 'react-redux';
import update from 'immutability-helper';
import { createStructuredSelector } from 'reselect';

import AppConfig from 'Config/AppConfig';
import { parseToRupiah, isString, calcDiscount } from 'Lib';
import { UpDownCounter } from 'Components';
import { FETCH_CART } from 'GraphQL/Cart/Query';
import { UPDATE_CART_ITEM, DELETE_CART_ITEM } from 'GraphQL/Cart/Mutation';
import CartActions, { getCartItemSelected } from 'Redux/CartRedux';
import styles from './Styles';
import { Images } from 'Themes';
var _ = require('lodash');

class Item extends Component {
  constructor(props) {
    super(props);
    const { selected, data: { product: { _id: productId }} } = props;
    this.state = {
      selected: selected.indexOf(productId) > -1,
    };
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
  
  toggleSelect = state => {
    const { toggleSelectItem, data: { product: { _id } } } = this.props;
    toggleSelectItem(_id, state);
    this.setState({ selected: state });
  }
  
  render() {
    const { data, data: { product: { _id, title, photo, price, discount }, qty = 0 }, userId } = this.props
    const { selected } = this.state;
    if (!data) {
      return <View />
    }
    return (
      <View style={styles.container}>
        <CheckBox
          onValueChange={this.toggleSelect}
          value={selected} 
        />
        <Image
          source={{ uri: photo }}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.detail}>
          <Text style={styles.detailTitle}>{title}</Text>
          { discount > 0 &&
            <Text style={styles.detailPrice}>{parseToRupiah(calcDiscount(price, discount))}</Text>
          }
          { discount === 0 &&
            <Text style={styles.detailPrice}>{parseToRupiah(price)}</Text>
          }
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
  toggleSelectItem: func,
  selected: arrayOf(string),
}

const mapStateToProps = createStructuredSelector({
  selected: getCartItemSelected(),
});

const mapDispatchToProps = dispatch => ({
  toggleSelectItem: (product_id, status) =>
    dispatch(CartActions.toggleSelectItem(product_id, status)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  UPDATE_CART_ITEM
)(Item);