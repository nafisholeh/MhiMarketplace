import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { arrayOf, number, shape, string, bool, func } from 'prop-types';
import { withNavigation } from 'react-navigation';
import { Mutation } from 'react-apollo';
import { DotIndicator } from 'react-native-indicators';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ApolloClientProvider from 'Services/ApolloClientProvider';
import { parseToRupiah, calcDiscount } from 'Lib';
import { Colors } from 'Themes';
import { FETCH_CART } from 'GraphQL/Cart/Query';
import { SYNC_CART } from 'GraphQL/Cart/Mutation';
import { ADD_CHECKOUT } from 'GraphQL/Checkout/Mutation';
import {
  getCartItems,
  getCartTotalGrossPrice,
  getCartItemIdSelected,
  isCheckoutValid
} from 'Redux/CartRedux';
import CheckoutActions from 'Redux/CheckoutRedux';
import { getUserId } from 'Redux/SessionRedux';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInitiatingCheckout: false,
      isInitiateCheckoutError: null,
    };
  }
  
  onOpenCheckoutPage = () => {
    const { navigation } = this.props;
    navigation.navigate('Checkout');
  }
  
  initiateCheckout = () => {
    const { userId } = this.props;
    this.setState({
      isInitiatingCheckout: true,
      isInitiateCheckoutError: null,
    });
    ApolloClientProvider.client.mutate({
      mutation: ADD_CHECKOUT,
      variables: { user_id: userId }
    })
    .then(res => {
      const { data: { addCheckout: { _id:checkoutId = 0 }}} = res;
      const { storeCheckoutId } = this.props;
      storeCheckoutId(checkoutId);
      this.setState({ isInitiatingCheckout: false });
      this.onOpenCheckoutPage();
    })
    .catch(err => {
      this.setState({
        isInitiatingCheckout: false,
        isInitiateCheckoutError: true,
      });
    });
  };
  
  onStartSyncCart = syncCartItem => {
    const { userId, cartItems, selectedCartItems } = this.props;
    const cartItemUpload = cartItems.map(n => ({
      product_id: n.product._id,
      qty: n.qty,
      selected: selectedCartItems.indexOf(n.product._id) > -1,
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
    const { isInitiatingCheckout, isInitiateCheckoutError } = this.state;
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
          onCompleted={this.initiateCheckout}
          ignoreResults={false}
          errorPolicy='all'>
          { (syncCartItem, {loading, error, data}) => {
            return (
              <TouchableOpacity
                onPress={() => this.onStartSyncCart(syncCartItem)}
                disabled={
                  loading ||
                  isInitiatingCheckout ||
                  !isCheckoutValid}
                style={{
                  height: 50,
                  backgroundColor: isCheckoutValid ? Colors.green_light : Colors.brown_light,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                >
                {(loading || isInitiateCheckoutError) &&
                  <DotIndicator
                    count={4}
                    size={7}
                    color='white'
                    animationDuration={800}
                  />
                }
                {(!loading && !isInitiateCheckoutError) &&
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
  selectedCartItems: arrayOf(string),
  storeCheckoutId: func,
};

const mapStateToProps = createStructuredSelector({
  userId: getUserId(),
  cartItems: getCartItems(),
  grossTotal: getCartTotalGrossPrice(),
  isCheckoutValid: isCheckoutValid(),
  selectedCartItems: getCartItemIdSelected(),
});

const mapDispatchToProps = dispatch => ({
  storeCheckoutId: checkoutId => dispatch(CheckoutActions.storeCheckoutId(checkoutId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Footer));