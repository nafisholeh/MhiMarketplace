import React, { Component, Fragment } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { string, arrayOf, shape, number, func, bool } from "prop-types";
import { DotIndicator } from "react-native-indicators";

import { Colors, METRICS } from "Themes";
import {
  parseToRupiah,
  calcDiscount,
  moderateScale,
  getReadableTotalWeight,
  getTotalWeight,
} from "Lib";
import ApolloClientProvider from "Services/ApolloClientProvider";
import { FETCH_COURIER_COST } from "GraphQL/CourierCost/Query";
import { getUserId, isReseller } from "Redux/SessionRedux";
import { getCartItemSelected } from "Redux/CartRedux";
import CheckoutActions, {
  getSelectedShipmentLocation,
} from "Redux/CheckoutRedux";
import AppConfig from "Config/AppConfig";

class PaymentDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grossPrice: 0,
      cleanPrice: 0,
      totalWeight: 0,
      totalDiscount: 0,
      totalCost: 0,
      isCourierCostFetching: false,
      isCourierCostError: false,
      courierCost: null,
      courierCosts: null,
      distance: null,
      isDistanceFetching: false,
      isDistanceError: false,
    };
  }

  componentDidMount() {
    this.setupData();
    this.setupCourierCost();
    this.setupDistance();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedLocation !== this.props.selectedLocation) {
      this.setupDistance();
    }
  }

  updateRedux = () => {
    const { updatePaymentDetails } = this.props;
    const { grossPrice, totalDiscount, totalCost, courierCost } = this.state;
    updatePaymentDetails(grossPrice, totalDiscount, courierCost, totalCost);
  };

  setupData = () => {
    const { data } = this.props;
    this.setState(
      {
        cleanPrice: this.getCleanPrice(data),
        grossPrice: this.getGrossPrice(data),
        totalDiscount: this.getDiscount(data),
      },
      () => {
        const { totalDiscount } = this.state;
        this.setState(
          {
            totalCost: this.getTotalCost(),
          },
          () => {
            this.updateRedux();
          }
        );
      }
    );
  };

  getCleanPrice = (data) => {
    if (!Array.isArray(data)) return 0;
    const total = data.reduce((total, value) => {
      const {
        product: { price = 0, discount = 0 },
        qty = 0,
      } = value;
      return total + (price - calcDiscount(price, discount)) * qty;
    }, 0);
    return total;
  };

  getGrossPrice = (data) => {
    if (!Array.isArray(data)) return 0;
    const total = data.reduce((total, value) => {
      const {
        product: { price = 0, discount = 0 },
        qty = 0,
      } = value;
      return total + price * qty;
    }, 0);
    return total;
  };

  getDiscount = (data) => {
    if (!Array.isArray(data)) return 0;
    const total = data.reduce((total, value) => {
      const {
        product: { price = 0, discount = 0 },
        qty = 0,
      } = value;
      return total + calcDiscount(price, discount) * qty;
    }, 0);
    return total;
  };

  getTotalCost = (courier = 0) => {
    const { data } = this.props;
    if (!Array.isArray(data)) return 0;
    const total = this.getCleanPrice(data);
    return total + courier;
  };

  setupCourierCost = async () => {
    this.setState({ isCourierCostFetching: true, isCourierCostError: false });
    const result = await ApolloClientProvider.client.query({
      query: FETCH_COURIER_COST,
    });
    if (!result) {
      this.setState({ isCourierCostFetching: false, isCourierCostError: true });
      return;
    }
    const { data } = result || {};
    const { courierCosts = [] } = data || {};
    this.setState(
      {
        isCourierCostFetching: false,
        courierCosts,
      },
      () => {
        this.calculateCourierCost();
      }
    );
  };

  setupDistance = async (sourceLat = "-8.141080", sourceLng = "113.731415") => {
    const { selectedLocation } = this.props;
    if (!sourceLat || !sourceLng || !selectedLocation) return;
    const { lat: destinationLat, lng: destinationLng } = selectedLocation || {};
    if (!destinationLat || !destinationLng) return;
    try {
      this.setState({ isDistanceFetching: true, isDistanceError: false });
      const routeCall = await fetch(
        `https://routing.openstreetmap.de/routed-car/route/v1/driving/` +
          `${destinationLng},${destinationLat};${sourceLng},${sourceLat}?` +
          `overview=false&steps=false`
      );
      const route = await routeCall.json();
      const { routes, code } = route || {};
      if (code === "Ok") {
        const [{ distance }] = routes || [];
        this.setState({ distance, isDistanceFetching: false }, () => {
          this.calculateCourierCost();
        });
      } else {
        // calculate using geodistance
        this.setState({ distance: 0, isDistanceFetching: false }, () => {
          this.calculateCourierCost();
        });
      }
    } catch (error) {
      this.setState({ isDistanceError: true });
    }
  };

  calculateCourierCost = () => {
    const { isReseller, data } = this.props;
    const totalWeight = getTotalWeight(data);
    if (isReseller && totalWeight >= AppConfig.MIN_WEIGHT_FREE_COURIER) {
      this.setState({ totalWeight, courierCost: 0 });
      return;
    }
    const { courierCosts, distance } = this.state;
    if (
      !courierCosts ||
      !Array.isArray(courierCosts) ||
      !courierCosts.length ||
      !distance
    ) {
      this.setState({ totalWeight });
      return;
    }
    const courierCostMatch = courierCosts.find(
      ({ distance_min, distance_max }) =>
        distance >= distance_min && distance <= distance_max
    );
    const { cost, is_per_km } = courierCostMatch || {};
    const totalCourierCost = is_per_km
      ? cost * Math.ceil(parseFloat(distance / 1000.0))
      : cost;
    this.setState(
      {
        courierCost: totalCourierCost,
        totalWeight,
        totalCost: this.getTotalCost(totalCourierCost),
      },
      () => {
        this.updateRedux();
      }
    );
  };

  render() {
    const {
      totalWeight,
      totalDiscount,
      courierCost = 0,
      totalCost,
      grossPrice,
      cleanPrice,
      isCourierCostFetching,
      isDistanceFetching,
    } = this.state;
    return (
      <View
        style={{
          backgroundColor: Colors.white,
          borderTopWidth: 0.8,
          borderTopColor: Colors.BORDER,
          marginTop: moderateScale(20),
          paddingHorizontal: moderateScale(15),
          paddingTop: moderateScale(15),
        }}
      >
        <View style={styles.paymentDetail}>
          <Text style={styles.priceTitle}>Berat Total</Text>
          <Text style={styles.priceValue}>{`${totalWeight} kg` || "-"}</Text>
        </View>
        <View style={styles.paymentDetail}>
          <Text style={styles.priceTitle}>Harga Sebenarnya</Text>
          <Text style={styles.priceValue}>
            {parseToRupiah(grossPrice) || "-"}
          </Text>
        </View>
        <View style={styles.paymentDetail}>
          <Text style={styles.priceTitle}>Harga Kurir</Text>
          {isCourierCostFetching || isDistanceFetching ? (
            <View style={{ alignItems: "flex-end" }}>
              <DotIndicator
                count={3}
                size={6}
                color={Colors.veggie_dark}
                animationDuration={800}
              />
            </View>
          ) : (
            <Text style={styles.priceValue}>
              {courierCost === 0 ? "Gratis" : parseToRupiah(courierCost) || "-"}
            </Text>
          )}
        </View>
        {totalDiscount ? (
          <Fragment>
            <View style={styles.paymentDetail}>
              <Text style={styles.priceTitle}>Harga Akhir</Text>
              <Text style={styles.priceValue}>
                {parseToRupiah(grossPrice + courierCost) || "-"}
              </Text>
            </View>
            <View style={styles.paymentDetail}>
              <Text style={styles.priceTitle}>
                Harga diskon (Anda menghemat)
              </Text>
              <Text style={styles.priceValue}>
                {`${parseToRupiah(totalDiscount)}` || "-"}
              </Text>
            </View>
          </Fragment>
        ) : null}
        <View style={{ marginHorizontal: METRICS.SMALL }}>
          <Text style={styles.priceTitle}>Total yang dibayarkan</Text>
          <Text
            style={{
              fontFamily: "CircularStd-Bold",
              fontSize: 22,
              textAlign: "right",
              color: Colors.green_light,
            }}
          >
            {parseToRupiah(totalCost) || "-"}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  priceTitle: {
    fontFamily: "CircularStd",
    fontSize: 14,
    color: "rgba(0,0,0,0.68)",
  },
  priceValue: {
    fontFamily: "CircularStd-Book",
    fontSize: 16,
    color: "rgba(0,0,0,0.68)",
  },
  paymentDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: METRICS.SMALL,
    marginBottom: METRICS.TINY,
  },
});

PaymentDetails.propTypes = {
  userId: string,
  data: arrayOf(
    shape({
      product: {
        _id: string,
        title: string,
        photo: string,
        price: number,
        discount: number,
      },
      qty: number,
    })
  ),
  updatePaymentDetails: func,
  selectedLocation: shape({
    lat: string,
    lng: string,
  }),
  isReseller: bool,
};

const mapStateToProps = createStructuredSelector({
  userId: getUserId(),
  selectedLocation: getSelectedShipmentLocation(),
  isReseller: isReseller(),
});

const mapDispatchToProps = (dispatch) => ({
  updatePaymentDetails: (gross, discount, courier, total) =>
    dispatch(
      CheckoutActions.updatePaymentDetails(gross, discount, courier, total)
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentDetails);
