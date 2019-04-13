import React, { Component } from 'react';
import { Text, Image, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { shape, number, string, func, arrayOf } from 'prop-types';
import { compose, Mutation } from 'react-apollo';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withNavigation } from 'react-navigation';

import { parseToRupiah, calcDiscount } from 'Lib';
import { Images } from 'Themes';
import styles from './Styles';
import { getUserId } from 'Redux/SessionRedux';
import { getCartItemIds } from 'Redux/CartRedux';
import { UPDATE_CART_ITEM, UPDATE_CART_ITEM_SCHEMA, cacheUpdateCartItem } from 'GraphQL/Cart/Mutation';

class Item extends Component {
  
  onItemClicked = () => {
    const { data, navigation } = this.props;
    navigation.navigate('ProductDetail', { data });
  }
  
  render() {
    const { data, cartItemIds, userId } = this.props
    if (!data) {
      return <View />
    }
    const  { _id: productId, title, price, discount, photo } = data
    const isInsideCart = cartItemIds.indexOf(productId) > -1;
    return (
      <TouchableOpacity 
        onPress={this.onItemClicked}
        style={styles.product__item}
      >
        <View style={styles.product__item_content}>
          <Image source={{uri: photo }} style={{width:60, height:60}}/>
          <View style={styles.product__item_detail}>
            <Text style={{fontWeight:'bold'}}>{title}</Text>
            <Text style={
                discount ? 
                  {
                    textDecorationLine: 'line-through', 
                    textDecorationStyle: 'solid'
                  } 
                  : {}
            }>
              {parseToRupiah(price)}
            </Text>
            <Text>{parseToRupiah(calcDiscount(price, discount))}</Text>
          </View>
          { !isInsideCart &&
            <Mutation
              mutation={UPDATE_CART_ITEM_SCHEMA}
              variables={{ user_id: userId, product_id: productId, qty: null }}
              update={(cache, data) => cacheUpdateCartItem(cache, data, productId)}
              onError={(error) => {}}
              ignoreResults={false}
              errorPolicy='all'>
              { (updateCartItem, {loading, error, data}) => {
                if (data) return (<View/>);
                return (
                  <TouchableOpacity
                    style={styles.product__item_cart}
                    onPress={() => updateCartItem()}
                  >
                    {loading && (<ActivityIndicator size="small" />)}
                    {!loading && (
                      <Image
                        source={error ? Images.syncFailed : Images.cart}
                        style={styles.itemImage}
                      />
                    )}
                  </TouchableOpacity>
                );
              }}
            </Mutation>
          }
        </View>
      </TouchableOpacity>
    )
  }
}

Item.propTypes = {
  data: shape({
    _id: string,
    title: string,
    price: number,
    discount: number,
    photo: string,
  }),
  updateCartItem: func,
  userId: string,
  cartItemIds: arrayOf(string),
}

const mapStateToProps = createStructuredSelector({
  userId: getUserId(),
  cartItemIds: getCartItemIds(),
})

export default compose(
  connect(mapStateToProps, null), 
  UPDATE_CART_ITEM
)(withNavigation(Item));