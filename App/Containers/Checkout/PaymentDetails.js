import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { string, arrayOf, shape, number } from 'prop-types';

import { Colors, Metrics } from 'Themes';
import styles from './Styles';
import { parseToRupiah, calcDiscount } from 'Lib';
import ApolloClientProvider from 'Services/ApolloClientProvider';
import { FETCH_CART } from 'GraphQL/Cart/Query';
import { getUserId } from 'Redux/SessionRedux';
import { getCartItemSelected } from 'Redux/CartRedux';

class PaymentDetails extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      totalDiscount: 0,
      courierCost: 0,
      totalCost: 0,
    };
  }
  
  componentDidMount() {
    this.setupData();
  }
  
  getDiscount = data => {
    if (!Array.isArray(data)) return 0;
    const total = data.reduce((total, value) => {
      const { product: { price = 0, discount = 0} } = value;
      return total + calcDiscount(price, discount);
    }, 0);
    return total;
  }
  
  setupData = () => {
    const { userId, selectedCartItems } = this.props;
    let selectedCarts = [];
    if (selectedCartItems.length > 0) {
      selectedCarts = selectedCartItems;
    } else {
      const { cart } = ApolloClientProvider.client.cache.readQuery({
        query: FETCH_CART,
        variables: { user_id: userId }
      });
      if (!cart) return;
      selectedCarts = cart.filter(n => n.product.selected);
    }
    this.setState({
      totalDiscount: this.getDiscount(selectedCarts),
    });
  };
  
  render() {
    const { totalDiscount, courierCost, totalCost } = this.state;
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
          <Text>Total diskon</Text>
          <Text>{parseToRupiah(totalDiscount)}</Text>
        </View>
        <View style={styles.paymentDetail}>
          <Text>Harga Kurir</Text>
          <Text>{parseToRupiah(courierCost)}</Text>
        </View>
        <View style={{ marginHorizontal: Metrics.baseMargin }}>
          <Text>Total yang harus dibayarkan</Text>
          <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'right' }}>
            {parseToRupiah(totalCost)}
          </Text>
        </View>
      </View>
    );
  }
}

PaymentDetails.propTypes = {
  userId: string,
  selectedCartItems: arrayOf(
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
};

const mapStateToProps = createStructuredSelector({
  userId: getUserId(),
  selectedCartItems: getCartItemSelected(),
});

export default connect(mapStateToProps, null)(PaymentDetails);
