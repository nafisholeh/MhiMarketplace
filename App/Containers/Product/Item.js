import React, { Component } from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';
import { shape, number, string, func } from 'prop-types';
import { compose } from 'react-apollo';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withNavigation } from 'react-navigation';

import { parseToRupiah, calcDiscount } from 'Lib';
import { Images } from 'Themes';
import styles from './Styles';
import { getUserId } from 'Redux/SessionRedux';
import { UPDATE_CART_ITEM } from 'GraphQL/Cart/Mutation';

class Item extends Component {
  
  onItemClicked = () => {
    const { data, navigation } = this.props;
    navigation.navigate('ProductDetail', { data });
  }
  
  onCartClicked = () => {
    const { updateCartItem, data: { _id }, userId } = this.props;
    updateCartItem({
      user_id: userId,
      product_id: _id,
      qty: null,
    })
  }
  
  render() {
    const { data } = this.props
    if (!data) {
      return <View />
    }
    const  { title, price, discount, photo } = data
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
                  {textDecorationLine: 'line-through', textDecorationStyle: 'solid'} 
                  : {}
            }>
              {parseToRupiah(price)}
            </Text>
            <Text style={{}}>{parseToRupiah(calcDiscount(price, discount))}</Text>
          </View>
          <TouchableOpacity style={styles.product__item_cart} onPress={this.onCartClicked}>
            <Image source={Images.cart} style={styles.itemImage} />
          </TouchableOpacity>
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
}

const mapStateToProps = createStructuredSelector({
  userId: getUserId(),
})

export default compose(
  connect(mapStateToProps, null), 
  UPDATE_CART_ITEM
)(withNavigation(Item));