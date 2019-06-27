import React, { Component, Fragment } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { string, arrayOf, shape, number, func } from 'prop-types';

import { Colors, Metrics } from 'Themes';
import styles from './Styles';
import { parseToRupiah, calcDiscount } from 'Lib';
import ApolloClientProvider from 'Services/ApolloClientProvider';
import { FETCH_COURIER_COST } from 'GraphQL/CourierCost/Query';
import { getUserId } from 'Redux/SessionRedux';
import { getCartItemSelected } from 'Redux/CartRedux';
import CheckoutActions from 'Redux/CheckoutRedux';
import AppConfig from 'Config/AppConfig';

class PaymentDetails extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      grossPrice: 0,
      cleanPrice: 0,
      totalDiscount: 0,
      courierCost: AppConfig.defaulCourierCost,
      totalCost: 0,
    };
  }
  
  componentDidMount() {
    this.setupData();
    this.setupCourierCost();
  }
  
  updateRedux = () => {
    const { updatePaymentDetails } = this.props;
    const { grossPrice, totalDiscount, totalCost, courierCost } = this.state;
    updatePaymentDetails(grossPrice, totalDiscount, courierCost, totalCost);
  }
  
  setupData = () => {
    const { data } = this.props;
    this.setState({
      cleanPrice: this.getCleanPrice(data),
      grossPrice: this.getGrossPrice(data),
      totalDiscount: this.getDiscount(data),
    }, () => {
      const { totalDiscount, courierCost } = this.state;
      this.setState({
        totalCost: this.getTotalCost(data, courierCost)
      }, () => {
        this.updateRedux();
      });
    });
  };
  
  getCleanPrice = data => {
    if (!Array.isArray(data)) return 0;
    const total = data.reduce((total, value) => {
      const { product: { price = 0, discount = 0}, qty = 0 } = value;
      return total + ((price - calcDiscount(price, discount)) * qty);
    }, 0);
    return total;
  }
  
  getGrossPrice = data => {
    if (!Array.isArray(data)) return 0;
    const total = data.reduce((total, value) => {
      const { product: { price = 0, discount = 0}, qty = 0 } = value;
      return total + (price * qty);
    }, 0);
    return total;
  }
  
  getDiscount = data => {
    if (!Array.isArray(data)) return 0;
    const total = data.reduce((total, value) => {
      const { product: { price = 0, discount = 0}, qty = 0 } = value;
      return total + (calcDiscount(price, discount) * qty);
    }, 0);
    return total;
  };
  
  getTotalCost = (data, courier = 0) => {
    if (!Array.isArray(data)) return 0;
    const total = this.getCleanPrice(data);
    return total + courier;
  }
  
  setupCourierCost = async data => {
    try {
      const { courierCosts = [] } = ApolloClientProvider.client.cache.readQuery({
        query: FETCH_COURIER_COST
      });
      this.setState({ courierCost: courierCosts[0].cost });
    } catch (error) {
      const result = await ApolloClientProvider.client.query({
        query: FETCH_COURIER_COST
      });
      if (!result) return;
      const { courierCosts = [] } = result;
      this.setState({ 
        courierCost: courierCosts[0].cost,
      }, () => {
        const { totalDiscount, courierCost } = this.state;
        const { data } = this.props;
        this.setState({
          totalCost: this.getTotalCost(data, courierCost)
        }, () => {
          this.updateRedux();
        })
      });
    }
  };
  
  render() {
    const {
      totalDiscount,
      courierCost = 0,
      totalCost,
      grossPrice,
      cleanPrice
    } = this.state;
    return (
      <View
        style={{
          borderTopColor: Colors.brown_light,
          borderTopWidth: 0.5,
          marginTop: Metrics.baseMargin,
          paddingTop: Metrics.doubleBaseMargin,
        }}
      >
        <View style={styles.paymentDetail}>
          <Text>Harga Sebenarnya</Text>
          <Text>{parseToRupiah(grossPrice) || '-'}</Text>
        </View>
        <View style={styles.paymentDetail}>
          <Text>Harga Kurir</Text>
          <Text>{parseToRupiah(courierCost) || '-'}</Text>
        </View>
        {totalDiscount ? 
          (
            <Fragment>
              <View style={styles.paymentDetail}>
                <Text>Harga Akhir</Text>
                <Text>{parseToRupiah(grossPrice + courierCost) || '-'}</Text>
              </View>
              <View style={styles.paymentDetail}>
                <Text>Harga diskon (Anda menghemat)</Text>
                <Text
                  style={{
                    color: Colors.red
                  }}
                >
                  {`${parseToRupiah(totalDiscount)}` || '-'}
                </Text>
              </View>
            </Fragment>
          ) : 
          null
        }
        <View style={{ marginHorizontal: Metrics.baseMargin }}>
          <Text>Total yang dibayarkan</Text>
          <Text style={{
              fontSize: 22,
              fontWeight: 'bold',
              textAlign: 'right',
              color: Colors.green_light
            }}
          >
            {parseToRupiah(totalCost) || '-'}
          </Text>
        </View>
      </View>
    );
  }
}

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
};

const mapStateToProps = createStructuredSelector({
  userId: getUserId(),
});

const mapDispatchToProps = dispatch => ({
  updatePaymentDetails: (gross, discount, courier, total) => 
    dispatch(CheckoutActions.updatePaymentDetails(gross, discount, courier, total))
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentDetails);
