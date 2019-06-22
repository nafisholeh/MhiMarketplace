import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Query, Mutation, compose } from 'react-apollo';
import { string, func, number, bool } from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { withNavigation } from 'react-navigation';

import Item from './Item';
import Footer from './Footer';
import { FETCH_CART } from 'GraphQL/Cart/Query';
import { UPDATE_CART_ITEM } from 'GraphQL/Cart/Mutation';
import { FETCH_SOME_PRODUCT } from 'GraphQL/Product/Query';
import { OptimizedList, StatePage } from 'Components';
import { getUserId, isKurir } from 'Redux/SessionRedux';
import { getCartTotalGrossPrice } from 'Redux/CartRedux';
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
    const { userId } = this.props;
    return (
      <Item 
        key={item._id}
        data={item}
        userId={userId}
        navigation={this.props.navigation}
      />
    );
  };

  render() {
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
        <ScrollView
          style={{flex:1}}
          contentContainerStyle={{ flex: 1 }}
        >
          <Query 
            query={FETCH_CART}
            variables={{ user_id: userId }}>
            {({ loading, error, data, refetch }) => {
              if (loading) {
                return (<View></View>)
              } else if (error) {
                return (<View></View>)
              } else if (data) {
                const { cart } = data;
                if (cart && cart.length === 0) {
                  return (
                    <StatePage 
                      title="Keranjang belanja kosong"
                      subtitle="ayo mulai belanja"
                      buttonTitle="Belanja Yuk"
                      icon={AppConfig.pageState.EMPTY_CART}
                      onPress={this.startBuying}
                    />
                  )
                }
                const { checked_out, checked_out_id } = cart[0];
                if (checked_out) {
                  storeCheckoutId(checked_out_id);
                  return (
                    <StatePage 
                      title="Pesanan sebelumnya belum selesai"
                      subtitle="Silahkan selesaikan terlebih dahulu"
                      buttonTitle="Selesaikan Yuk"
                      icon={AppConfig.pageState.NEED_CHECKOUT}
                      onPress={this.openCheckout}
                    />
                  )
                }
                return (
                  <FlatList
                    keyExtractor={(item, id) => item._id.toString()}
                    data={cart} 
                    renderItem={this.renderCartItems}
                  />
                )
              }
            }}
          </Query>
        </ScrollView>
        <Footer />
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
}

const mapStateToProps = createStructuredSelector({
  userId: getUserId(),
  grossPriceTotal: getCartTotalGrossPrice(),
  isKurir: isKurir(),
});

const mapDispatchToProps = dispatch => ({
  storeCheckoutId: checkoutId => dispatch(CheckoutActions.storeCheckoutId(checkoutId)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  UPDATE_CART_ITEM
)(withNavigation(Cart));