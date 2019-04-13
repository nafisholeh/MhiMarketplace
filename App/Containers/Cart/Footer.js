import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { arrayOf, number, shape, string, bool } from 'prop-types';
import { withNavigation } from 'react-navigation';
import { Mutation } from 'react-apollo';
import { DotIndicator } from 'react-native-indicators';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { parseToRupiah, calcDiscount } from 'Lib';
import { Colors } from 'Themes';
import { FETCH_CART } from 'GraphQL/Cart/Query';
import { SYNC_CART } from 'GraphQL/Cart/Mutation';
import {
  getCartItems,
  getCartTotalGrossPrice,
  getCartItemSelected,
  isCheckoutValid
} from 'Redux/CartRedux';
import { getUserId } from 'Redux/SessionRedux';

class Footer extends Component {
  
  startCheckout = () => {
    const { navigation } = this.props;
    navigation.navigate('Checkout');
  };
  
  onStartSyncCart = syncCartItem => {
    const { userId, cartItems } = this.props;
    const cartItemUpload = cartItems.map(n => ({
      product_id: n.product._id,
      qty: n.qty,
      selected: n.selected
    }));
    syncCartItem({
      variables: {
        user_id: userId,
        cart_item: cartItemUpload
      }
    })
  }
  
  onSyncCartOnCache = (cache, { data }) => {
    const { userId } = this.props;
    const { cart } = cache.readQuery({
      query: FETCH_CART,
      variables: { user_id: userId } 
    });
    console.tron.log('onSyncCartOnCache/cart', cart, userId)
    cache.writeQuery({
      query: FETCH_CART,
      variables: { user_id: userId },
      data: { cart }
    });
  }

  render() {
    const { grossTotal, isCheckoutValid } = this.props;
    return (
      <View style={{
          backgroundColor: Colors.white,
          borderTopWidth: 0.4,
          borderTopColor: Colors.brown_light
        }}>
        <View style={{ padding: 15 }}>
          <Text style={{ fontSize: 16 }}>Total</Text>
          <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
            {parseToRupiah(grossTotal)}
          </Text>
        </View>
        <Mutation
          mutation={SYNC_CART}
          update={this.onSyncCartOnCache}
          onCompleted={this.startCheckout}
          ignoreResults={false}
          errorPolicy='all'>
          { (syncCartItem, {loading, error, data}) => {
            return (
              <TouchableOpacity
                onPress={() => this.onStartSyncCart(syncCartItem)}
                disabled={loading || !isCheckoutValid}
                style={{
                  height: 50,
                  backgroundColor: isCheckoutValid ? Colors.green_light : Colors.brown_light,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                >
                {loading &&
                  <DotIndicator
                    count={4}
                    size={7}
                    color='white'
                    animationDuration={800}
                  />
                }
                {!loading &&
                  <Text style={{color: 'white'}}>
                    Checkout
                  </Text>
                }
              </TouchableOpacity>
            );
          }}
        </Mutation>
      </View>
    )
  }
}

Footer.propTypes = {
  data: arrayOf(
    shape({
      qty: number,
      product: {
        price: number,
        discount: number,
      }
    })
  ),
  cartItems: arrayOf(
    shape({
      _id: string,
      product: shape({
        _id: string,
      }),
      qty: number,
      selected: bool,
    })
  ),
  userId: string,
  grossTotal: number,
  isCheckoutValid: bool,
};

const mapStateToProps = createStructuredSelector({
  userId: getUserId(),
  cartItems: getCartItems(),
  grossTotal: getCartTotalGrossPrice(),
  isCheckoutValid: isCheckoutValid(),
});

export default connect(mapStateToProps, null)(withNavigation(Footer));