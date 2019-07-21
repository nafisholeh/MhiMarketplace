import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { arrayOf, number, shape, string, bool, func } from 'prop-types';
import { withNavigation } from 'react-navigation';
import { Mutation } from 'react-apollo';
import { DotIndicator } from 'react-native-indicators';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ApolloClientProvider from 'Services/ApolloClientProvider';
import { parseToRupiah, moderateScale, calcDiscount, InAppNotification } from 'Lib';
import { Colors, Metrics } from 'Themes';
import { FETCH_CART } from 'GraphQL/Cart/Query';
import { SYNC_CART, cacheSetCart } from 'GraphQL/Cart/Mutation';
import { START_CHECKOUT } from 'GraphQL/Order/Mutation';
import CartActions, {
  getCartItems,
  getCartTotalGrossPrice,
  getCartItemIdSelected,
  isCheckoutValid,
  resetCart,
  isCartFilled,
  isAnyCartItemSelected
} from 'Redux/CartRedux';
import CheckoutActions from 'Redux/CheckoutRedux';
import { getUserId } from 'Redux/SessionRedux';
import { ButtonSecondary } from 'Components';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInitiatingCheckout: false,
    };
  }
  
  componentDidMount() {
    const { storeOutOfStock } = this.props;
    storeOutOfStock(null);
  }
  
  onOpenCheckoutPage = () => {
    const { navigation } = this.props;
    navigation.navigate('Checkout');
  }
  
  initiateCheckout = data => {
    const { userId, storeCheckoutId, resetCart, storeOutOfStock } = this.props;
    this.setState({ isInitiatingCheckout: true });
    ApolloClientProvider.client.mutate({
      mutation: START_CHECKOUT,
      variables: { user_id: userId },
      refetchQueries: [{
        query: FETCH_CART,
        variables: { user_id: userId }
      }],
    })
    .then(res => {
      this.setState({ isInitiatingCheckout: false });
      const { data: { startCheckout: { _id:checkoutId = 0, status, products }}} = res;
      if (status === 'out of stock') {
        const outOfStockProducts = Array.isArray(products) && products.map(({ _id, qty }) => ({ _id, maxStock: qty }));
        const outOfStockTotal = Array.isArray(products) && products.length ? `${products.length} ` : ' ';
        storeOutOfStock(outOfStockProducts);
        InAppNotification.error("Checkout pesanan gagal", `Maaf, ada ${outOfStockTotal}produk yang melebihi stok`);
        return;
      }
      storeCheckoutId(checkoutId);
      resetCart();
      this.onOpenCheckoutPage();
    })
    .catch(err => {
      InAppNotification.error();
      this.setState({ isInitiatingCheckout: false });
    });
  };
  
  onStartSyncCart = syncCartItem => {
    const { userId, cartItems = [], selectedCartItems = [] } = this.props;
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

  render() {
    const { grossTotal, isCheckoutValid, isCartFilled, isAnyCartItemSelected } = this.props;
    const { isInitiatingCheckout } = this.state;
    return (
      <View
        style={{
          backgroundColor: Colors.white,
          borderTopWidth: 0.8,
          borderTopColor: Colors.border
        }}>
        {isCheckoutValid &&
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: moderateScale(30),
              paddingVertical: moderateScale(15),
            }}
          >
            <Text
              style={{
                fontFamily: 'CircularStd',
                fontSize: 16,
                color: 'rgba(0,0,0,0.68)',
              }}
            >
              Total
            </Text>
            <Text
              style={{
                fontFamily: 'CircularStd-Bold',
                fontSize: 16,
                color: Colors.black
              }}
            >
              {parseToRupiah(grossTotal) || '0'}
            </Text>
          </View>
        }
        <Mutation
          mutation={SYNC_CART}
          update={cacheSetCart}
          onCompleted={this.initiateCheckout}
          ignoreResults={false}
          errorPolicy='all'>
          { (syncCartItem, {loading, error, data}) => {
            return (
              <ButtonSecondary
                onPress={() => this.onStartSyncCart(syncCartItem)}
                disabled={
                  loading ||
                  isInitiatingCheckout ||
                  !isCheckoutValid}
                loading={loading || isInitiatingCheckout}
                colors={isCheckoutValid ?
                  [Colors.veggie_light, Colors.veggie_dark]
                  : [Colors.disabled_light, Colors.disabled_dark]
                }
                title="Checkout"
                style={{
                  marginBottom: moderateScale(10),
                  marginTop: !isAnyCartItemSelected ? moderateScale(15) : 0,
                }}
              />
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
  resetCart: func,
  isCartFilled: bool,
  isAnyCartItemSelected: bool,
};

const mapStateToProps = createStructuredSelector({
  userId: getUserId(),
  cartItems: getCartItems(),
  grossTotal: getCartTotalGrossPrice(),
  isCheckoutValid: isCheckoutValid(),
  selectedCartItems: getCartItemIdSelected(),
  isCartFilled: isCartFilled(),
  isAnyCartItemSelected: isAnyCartItemSelected(),
});

const mapDispatchToProps = dispatch => ({
  storeCheckoutId: checkoutId => dispatch(CheckoutActions.storeCheckoutId(checkoutId)),
  resetCart: () => dispatch(CartActions.resetCart()),
  storeOutOfStock: outOfStockProducts => dispatch(CartActions.storeOutOfStock(outOfStockProducts)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Footer));