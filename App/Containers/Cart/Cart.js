import React, { Component, Fragment } from 'react';
import { ScrollView, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Query, Mutation, compose } from 'react-apollo';
import { string, func, number, bool, arrayOf, shape } from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { withNavigation } from 'react-navigation';

import Item from './Item';
import Footer from './Footer';
import { FETCH_CART } from 'GraphQL/Cart/Query';
import { UPDATE_CART_ITEM } from 'GraphQL/Cart/Mutation';
import { FETCH_SOME_PRODUCT } from 'GraphQL/Product/Query';
import { OptimizedList, StatePage, QueryEffectPage } from 'Components';
import { getUserId, isKurir } from 'Redux/SessionRedux';
import { getCartTotalGrossPrice, getOutOfStock } from 'Redux/CartRedux';
import CheckoutActions from 'Redux/CheckoutRedux';
import { Images, Metrics, Colors } from 'Themes';
import ApolloClientProvider from 'Services/ApolloClientProvider';
import AppConfig from 'Config/AppConfig';
import { calcDiscount, parseToRupiah } from 'Lib';

class Cart extends Component {
  
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state
    return {
      title: 'Keranjang Belanja',
    }
  }
  
  constructor(props) {
    super(props);
    this.state = {
      refresh: false,
    };
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.outOfStock !== this.props.outOfStock) {
      this.setState((prevState) => {
        return {
          refresh: !prevState.refresh,
        }
      });
    }
  }
  
  startBuying = () => {
    const { navigation, isKurir } = this.props;
    if (isKurir) navigation.navigate('CourierShop');
    else navigation.navigate('Home');
  };
  
  onOpenSignin = () => {
    const { navigation } = this.props;
    navigation.navigate('Signin');
  };
  
  openCheckout = () => {
    const { navigation } = this.props;
    navigation.navigate('Checkout');
  }
  
  renderCartItems = ({ item, index }) => {
    const { _id: cartItemId, product: { _id: productId }} = item;
    const { userId, outOfStock } = this.props;
    const outOfStockProduct = Array.isArray(outOfStock) ?
      outOfStock.filter(({ _id, maxStock}) => productId === _id) : [];
    const maxStock = Array.isArray(outOfStockProduct) && outOfStockProduct.length ?
      outOfStockProduct[0].maxStock : 0;
    return (
      <Item 
        key={cartItemId}
        data={item}
        userId={userId}
        navigation={this.props.navigation}
        maxStock={maxStock}
      />
    );
  };

  render() {
    const { refresh } = this.state;
    const { userId, grossPriceTotal, storeCheckoutId } = this.props;
    if (!userId) {
      return (
        <View style={{flex:1}}>
          <StatePage 
            title="Anda belum terdaftar"
            subtitle="silahkan daftar/masuk terlebih dahulu"
            buttonTitle="Masuk"
            icon={AppConfig.pageState.EMPTY_CART}
            onPress={this.onOpenSignin}
          />
        </View>
      );
    }
    return (
      <View style={{flex:1}}>
        <Query 
          query={FETCH_CART}
          variables={{ user_id: userId }}>
          {({ loading, error, data, refetch }) => {
            const { cart = [] } = data;
            if (Array.isArray(cart) && cart.length) {
              const { checked_out, _id } = cart[0];
              if (checked_out) {
                storeCheckoutId(_id);
                return (
                  <QueryEffectPage
                    title="Pesanan sebelumnya belum selesai"
                    subtitle="Silahkan selesaikan terlebih dahulu"
                    buttonTitle="Selesaikan Yuk"
                    isEmpty
                    iconEmpty={AppConfig.pageState.NEED_CHECKOUT}
                    onRefetch={this.openCheckout}
                  />
                )
              }
              return (
                <Fragment>
                  <ScrollView
                    style={{flex:1}}
                    contentContainerStyle={{ flex: 1 }}
                  >
                    <FlatList
                      keyExtractor={(item, id) => item._id.toString()}
                      data={cart} 
                      renderItem={this.renderCartItems}
                      extraData={refresh}
                    />
                  </ScrollView>
                  <Footer />
                </Fragment>
              )
            }
            return (
              <QueryEffectPage
                title="Keranjang belanja kosong"
                subtitle="ayo mulai belanja"
                buttonTitle="Belanja Yuk"
                isLoading={loading}
                isError={error}
                isEmpty={!cart.length}
                iconEmpty={AppConfig.pageState.EMPTY_CART}
                onRefetch={() => {
                  if (!cart.length) this.startBuying();
                  else refetch();
                }}
              />
            );
          }}
        </Query>
      </View>
    )
  }
}

Cart.propTypes = {
  userId: string,
  grossPriceTotal: number,
  updateCartItem: func,
  storeCheckoutId: func,
  isKurir: bool,
  outOfStock: arrayOf(shape({
    _id: string,
    maxStock: number,
  })),
}

const mapStateToProps = createStructuredSelector({
  userId: getUserId(),
  grossPriceTotal: getCartTotalGrossPrice(),
  isKurir: isKurir(),
  outOfStock: getOutOfStock(),
});

const mapDispatchToProps = dispatch => ({
  storeCheckoutId: checkoutId => dispatch(CheckoutActions.storeCheckoutId(checkoutId)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  UPDATE_CART_ITEM
)(withNavigation(Cart));