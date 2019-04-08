import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Query, compose } from 'react-apollo';
import { string, func } from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { withNavigation } from 'react-navigation';

import Item from './Item';
import { FETCH_CART } from 'GraphQL/Cart/Query';
import { UPDATE_CART_ITEM } from 'GraphQL/Cart/Mutation';
import { FETCH_SOME_PRODUCT } from 'GraphQL/Product/Query';
import { OptimizedList, StatePage } from 'Components';
import { getUserId } from 'Redux/SessionRedux';
import { Metrics } from 'Themes';
import ApolloClientProvider from 'Services/ApolloClientProvider';
import AppConfig from 'Config/AppConfig';

class Cart extends Component {
  
  updateCart = (_id, qty) => {
    const { updateCartItem, userId } = this.props;
    updateCartItem({
      user_id: userId,
      product_id: _id,
      qty
    })
  }
  
  startBuying = () => {
    const { navigation } = this.props;
    navigation.navigate('Home');
  };
  
  checkout = () => {
    const { navigation } = this.props;
    navigation.navigate('Checkout');
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
    const { userId } = this.props;
    return (
      <View style={{flex:1}}>
        <ScrollView>
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
                      image={AppConfig.pageState.EMPTY_CART}
                      onPress={this.startBuying}
                    />
                  )
                }
                const { products = [] } = cart;
                return (
                  <View style={{ minHeight: 100 }}>
                    <OptimizedList
                      itemWidth={Metrics.deviceWidth}
                      itemHeight={100}
                      data={products} 
                      renderRow={this.renderCartItems}
                    />
                  </View>
                )
              }
            }}
          </Query>
        </ScrollView>
        <TouchableOpacity
          onPress={this.checkout}
          style={{
            height: 50, backgroundColor: 'gray',
            alignItems: 'center', justifyContent: 'center'
          }}
          >
          <Text style={{color: 'white'}}>
            Checkout
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

Cart.propTypes = {
  userId: string,
  updateCartItem: func,
}

const mapStateToProps = createStructuredSelector({
  userId: getUserId(),
});

export default compose(
  connect(mapStateToProps, null),
  UPDATE_CART_ITEM
)(withNavigation(Cart));