import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Query, Mutation, compose } from 'react-apollo';
import { string, func, number } from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { withNavigation } from 'react-navigation';

import Item from './Item';
import Footer from './Footer';
import { FETCH_CART } from 'GraphQL/Cart/Query';
import { UPDATE_CART_ITEM } from 'GraphQL/Cart/Mutation';
import { FETCH_SOME_PRODUCT } from 'GraphQL/Product/Query';
import { OptimizedList, StatePage } from 'Components';
import { getUserId } from 'Redux/SessionRedux';
import { getCartTotalGrossPrice } from 'Redux/CartRedux';
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
    const { navigation } = this.props;
    navigation.navigate('Home');
  };
  
  onOpenSignin = () => {
    const { navigation } = this.props;
    navigation.navigate('Signin');
  };
  
  renderCartItems = (type, data) => {
    const { userId } = this.props;
    return (
      <Item 
        data={data}
        userId={userId}
        navigation={this.props.navigation}
      />
    );
  };

  render() {
    const { userId, grossPriceTotal } = this.props;
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
            if (loading) {
              return (<View></View>)
            } else if (error) {
              return (<View></View>)
            } else if (data) {
              const { cart } = data;
              if (!cart) {
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
              return (
                <React.Fragment>
                  <ScrollView style={{flex:1}}>
                    <View style={{ minHeight: 100 }}>
                      <OptimizedList
                        itemWidth={Metrics.deviceWidth}
                        itemHeight={100}
                        data={cart} 
                        renderRow={this.renderCartItems}
                      />
                    </View>
                  </ScrollView>
                  <Footer data={cart} />
                </React.Fragment>
              )
            }
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
}

const mapStateToProps = createStructuredSelector({
  userId: getUserId(),
  grossPriceTotal: getCartTotalGrossPrice(),
});

export default compose(
  connect(mapStateToProps, null),
  UPDATE_CART_ITEM
)(withNavigation(Cart));