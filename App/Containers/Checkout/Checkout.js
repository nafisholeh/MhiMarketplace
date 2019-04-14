import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Query, Mutation } from 'react-apollo';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { string, number, shape } from 'prop-types';

import CheckoutTitle from './CheckoutTitle';
import AddressCheckout from 'Containers/Address/AddressCheckout';
import CheckoutList from './CheckoutList';
import DeliveryOptions from './DeliveryOptions';
import PaymentOptions from './PaymentOptions';
import PaymentDetails from './PaymentDetails';
import { Metrics, Colors } from 'Themes';
import { FINISH_CHECKOUT } from 'GraphQL/Checkout/Mutation';
import { FETCH_CHECKOUT_ITEMS } from 'GraphQL/Checkout/Query';
import { getUserId } from 'Redux/SessionRedux';
import { getPaymentOptSelected, getCheckoutId, getPaymentDetails } from 'Redux/CheckoutRedux';

class Checkout extends Component {
  
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state
    return {
      title: 'Rekap Pesanan',
    }
  }
  
  onFinishCheckout = finishCheckout => {
    const { 
      paymentOptSelected,
      paymentDetails: {
        gross = 0,
        discount = 0,
        courier = 0,
        total = 0
      },
      checkoutId
    } = this.props;
    finishCheckout({
      variables: {
        _id: checkoutId,
        payment_option: paymentOptSelected,
        gross_price: gross,
        total_discount: discount,
        courier_cost: courier,
        total_cost: total
      }
    });
  };
  
  onFinishCheckoutComplete = () => {
    console.tron.log('onFinishCheckoutComplete')
  };
  
  render() {
    const { userId, checkoutId } = this.props;
    return (
      <View style={{flex:1}}>
        <ScrollView style={{ flex: 1, marginBottom: Metrics.doubleBaseMargin }}>
          <CheckoutTitle title="Alamat Pengiriman" />
          <AddressCheckout />
          <Query 
            query={FETCH_CHECKOUT_ITEMS}
            variables={{ user_id: userId, _id: checkoutId }}>
            {({ loading, error, data, refetch }) => {
              if (loading) return (<View />);
              else if (error) return (<View />);
              const { checkout: checkoutItems } = data;
              return (
                <React.Fragment>
                  <CheckoutTitle title="Pesanan Anda" />
                  <CheckoutList data={checkoutItems} />
                  <CheckoutTitle title="Jadwal Pengiriman" />
                  <DeliveryOptions />
                  <CheckoutTitle title="Pembayaran" />
                  <PaymentOptions />
                  <PaymentDetails data={checkoutItems} />
                </React.Fragment>
              )
            }}
          </Query>
        </ScrollView>
        <Mutation
          mutation={FINISH_CHECKOUT}
          onCompleted={this.onFinishCheckoutComplete}
          ignoreResults={false}
          errorPolicy='all'>
          { (finishCheckout, {loading, error, data}) => {
            return (
              <TouchableOpacity
                onPress={() => this.onFinishCheckout(finishCheckout)}
                style={{
                  height: 50,
                  backgroundColor: Colors.green_light,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ color: 'white' }}>Selesai</Text>
              </TouchableOpacity>
            );
          }}
        </Mutation>
      </View>
    )
  }
}

Checkout.propTypes = {
  paymentOptSelected: string,
  userId: string,
  checkoutId: string,
  paymentDetails: shape({
    gross: number,
    discount: number,
    courier: number,
    total: number
  }),
};

const mapStateToProps = createStructuredSelector({
  paymentOptSelected: getPaymentOptSelected(),
  userId: getUserId(),
  checkoutId: getCheckoutId(),
  paymentDetails: getPaymentDetails(),
});

export default connect(mapStateToProps, null)(Checkout);