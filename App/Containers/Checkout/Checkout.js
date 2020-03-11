import React, { Component } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Query, Mutation } from "react-apollo";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { string, number, shape, arrayOf, bool } from "prop-types";
import { DotIndicator } from "react-native-indicators";

import CheckoutTitle from "./CheckoutTitle";
import AddressCheckout from "Containers/Address/AddressCheckout";
import CheckoutList from "./CheckoutList";
import DeliveryOptions from "./DeliveryOptions";
import PaymentOptions from "./PaymentOptions";
import PaymentDetails from "./PaymentDetails";
import { METRICS, Colors } from "Themes";
import { FETCH_CART } from "GraphQL/Cart/Query";
import { FINISH_CHECKOUT } from "GraphQL/Order/Mutation";
import { FETCH_CHECKOUT_ITEMS } from "GraphQL/Order/Query";
import { getUserId } from "Redux/SessionRedux";
import {
  getPaymentOptSelected,
  getCheckoutId,
  getPaymentDetails,
  getChosenShipment,
  getSelectedShipmentAddress,
  isShipmentSelected
} from "Redux/CheckoutRedux";
import { HeaderTitle, ButtonPrimary, QueryEffectSection } from "Components";
import { moderateScale } from "Lib";

class Checkout extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerLeft: null,
      headerRight: null,
      header: <HeaderTitle title="Checkout" />
    };
  };

  onFinishCheckout = finishCheckout => {
    const {
      paymentOptSelected,
      paymentDetails: { gross = 0, discount = 0, courier = 0, total = 0 },
      checkoutId,
      shippingDate,
      shipmentAddress
    } = this.props;
    finishCheckout({
      variables: {
        _id: checkoutId,
        payment_option: paymentOptSelected,
        gross_price: gross,
        total_discount: discount,
        courier_cost: courier || 0,
        total_cost: total,
        requested_shipping_date: shippingDate,
        shipping_address: shipmentAddress
      }
    });
  };

  onFinishCheckoutComplete = () => {
    const { navigation } = this.props;
    navigation.navigate("Slip");
  };

  render() {
    const {
      userId,
      checkoutId,
      shippingDate,
      isShipmentSelected,
      shipmentAddress
    } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{
            flex: 1,
            marginBottom: METRICS.LARGE
          }}
        >
          <CheckoutTitle title="Alamat Pengiriman" />
          <AddressCheckout />
          <Query
            query={FETCH_CHECKOUT_ITEMS}
            variables={{ user_id: userId, _id: checkoutId }}
          >
            {({ loading, error, data, refetch }) => {
              const items = data[Object.keys(data)[0]] || [];
              if (Array.isArray(items) && items.length) {
                return (
                  <React.Fragment>
                    <CheckoutTitle title="Pesanan Anda" />
                    <CheckoutList data={items} />
                    <CheckoutTitle title="Jadwal Pengiriman" />
                    <DeliveryOptions />
                    <CheckoutTitle title="Pembayaran" />
                    <PaymentOptions />
                    <PaymentDetails data={items} />
                  </React.Fragment>
                );
              }
              return (
                <QueryEffectSection
                  isLoading={loading}
                  isError={error}
                  isEmpty={!items.length}
                  onRefetch={refetch}
                />
              );
            }}
          </Query>
        </ScrollView>
        <Mutation
          mutation={FINISH_CHECKOUT}
          onCompleted={this.onFinishCheckoutComplete}
          ignoreResults={false}
          errorPolicy="all"
          refetchQueries={mutationResult => [
            {
              query: FETCH_CART,
              variables: { user_id: userId }
            }
          ]}
        >
          {(finishCheckout, { loading, error, data }) => {
            return (
              <ButtonPrimary
                onPress={() => this.onFinishCheckout(finishCheckout)}
                loading={loading}
                disabled={!isShipmentSelected || !shipmentAddress}
                title="Selesaikan Checkout"
              />
            );
          }}
        </Mutation>
      </View>
    );
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
  shippingDate: arrayOf(
    shape({
      date: string,
      time_start: string,
      time_end: string
    })
  ),
  shipmentAddress: string,
  isShipmentSelected: bool
};

const mapStateToProps = createStructuredSelector({
  paymentOptSelected: getPaymentOptSelected(),
  userId: getUserId(),
  checkoutId: getCheckoutId(),
  paymentDetails: getPaymentDetails(),
  shippingDate: getChosenShipment(),
  shipmentAddress: getSelectedShipmentAddress(),
  isShipmentSelected: isShipmentSelected()
});

export default connect(mapStateToProps, null)(Checkout);
