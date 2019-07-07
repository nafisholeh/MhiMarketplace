import React, { Component, Fragment } from 'react';
import { Text, Image, View, TouchableOpacity, ActivityIndicator, CheckBox } from 'react-native';
import { shape, number, string, func, arrayOf } from 'prop-types';
import { Mutation, compose } from 'react-apollo';
import { connect } from 'react-redux';
import update from 'immutability-helper';
import { createStructuredSelector } from 'reselect';

import { parseToRupiah, isString, calcDiscount, moderateScale } from 'Lib';
import { UpDownCounter, ProductVerticalWrapper, ProductImage } from 'Components';
import { FETCH_CART } from 'GraphQL/Cart/Query';
import { cacheSelectCartItem } from 'GraphQL/Cart/Mutation';
import { UPDATE_CART_ITEM, DELETE_CART_ITEM } from 'GraphQL/Cart/Mutation';
import CartActions, { getCartItemIdSelected } from 'Redux/CartRedux';
import { getUserId } from 'Redux/SessionRedux';
import styles from './Styles';
import { Images, Colors } from 'Themes';
var _ = require('lodash');

class Item extends Component {
  constructor(props) {
    super(props);
    const { selected, data: { product: { _id: productId }} } = props;
    this.state = {
      selected: selected.indexOf(productId) > -1,
    };
  }
  
  onCounterChanged = counter => {
    const { userId, updateCartItem, updateCartQty, data: { product: { _id: productId } } } = this.props;
    updateCartQty(productId, counter);
    updateCartItem({
      user_id: userId,
      product_id: productId,
      qty: counter,
    });
  }
  
  onItemDeleted = (cache, { data }) => {
    const { deleteCartItem, userId, data: { product: { _id: productId }} } = this.props;
    const { cart } = cache.readQuery({ query: FETCH_CART, variables: { user_id: userId } });
    if (!cart) return null;
    const deletedIndex = cart.findIndex(n => n.product._id === productId);
    deleteCartItem(productId);
    cache.writeQuery({
      query: FETCH_CART,
      variables: { user_id: userId },
      data: { cart: update(cart, { $splice: [[deletedIndex, 1]] }) }
    });
  };
  
  toggleSelect = state => {
    const { toggleSelectItem, data: { product: { _id } } } = this.props;
    toggleSelectItem(_id, state);
    cacheSelectCartItem(_id, state);
    this.setState({ selected: state });
  };
  
  onItemClicked = () => {
    const { selected } = this.state;
    this.toggleSelect(!selected);
  };
  
  render() {
    const {
      data,
      data: {
        product: { _id, title, photo, price, discount, unit },
        qty = 0
      },
      userId,
      maxStock,
      index
    } = this.props
    const { selected } = this.state;
    if (!data) {
      return <View />
    }
    return (
      <ProductVerticalWrapper
        disabled
        styleParent={{
          marginTop: index === 0 ? moderateScale(15) : 0,
          marginBottom: moderateScale(12),
        }}
        styleChildren={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <CheckBox
          onValueChange={this.toggleSelect}
          value={selected} 
        />
        <TouchableOpacity onPress={this.onItemClicked}>
          <ProductImage
            source={photo}
            style={{
              width: moderateScale(68),
              height: moderateScale(68),
              resizeMode: 'contain',
              marginRight: moderateScale(12),
            }}
          />
        </TouchableOpacity>
        <View style={styles.detail}>
          <View
            style={{
              flex: 1,
              marginTop: moderateScale(10),
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {discount && (
                <Text
                  style={{
                    fontFamily: 'CircularStd-Book',
                    fontSize: 14,
                    color: 'rgba(0,0,0,0.68)',
                    marginRight: moderateScale(10),
                  }}
                  numberOfLines={1}
                >
                  {parseToRupiah(price - calcDiscount(price, discount))}
                </Text>              
              )}
              {!discount && (
                <Text 
                  style={{
                    fontFamily: 'CircularStd-Book',
                    fontSize: 14,
                    color: 'rgba(0,0,0,0.68)',
                  }}
                  numberOfLines={1}
                >
                  {parseToRupiah(price)}
                </Text>
              )}
            </View>
            <Text
              style={{
                fontFamily: 'CircularStd-Bold',
                fontSize: 16,
                color: Colors.black,
              }}
              numberOfLines={2}
            >
              {title}
            </Text>
            { maxStock > 0 && 
              <Text
                style={{
                  fontFamily: 'CircularStd-Book',
                  fontSize: 12,
                  color: 'red',
                }}
              >
                Stok habis, sisa {maxStock}
              </Text>
            }
            <UpDownCounter
              initCounter={qty}
              unit="pcs"
              onCounterChanged={this.onCounterChanged}
            />
          </View>
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
      </ProductVerticalWrapper>
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
  updateCartQty: func,
  deleteCartItem: func,
  selected: arrayOf(string),
  maxStock: number,
  index: number,
}

const mapStateToProps = createStructuredSelector({
  selected: getCartItemIdSelected(),
  userId: getUserId(),
});

const mapDispatchToProps = dispatch => ({
  toggleSelectItem: (product_id, status) =>
    dispatch(CartActions.toggleSelectItem(product_id, status)),
  updateCartQty: (product_id, qty) =>
    dispatch(CartActions.updateCartQty(product_id, qty)),
  deleteCartItem: product_id =>
    dispatch(CartActions.deleteCartItem(product_id)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  UPDATE_CART_ITEM
)(Item);