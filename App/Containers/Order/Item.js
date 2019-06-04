import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { string, number, shape, arrayOf, func, bool } from 'prop-types';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

import styles from './Styles';
import CheckoutActions from 'Redux/CheckoutRedux';

class Item extends Component {
  onOpenOrderDetail = async () => {
    const { navigation, storeOpenedOrder, data: { _id: orderId, user_id, paid_off } } = this.props;
    const { name } = user_id || {};
    await storeOpenedOrder(orderId, name, paid_off);
    navigation.navigate('OrderDetail');
  };

  render() {
    const { data: { transaction_id: orderId, user_id, time, total_cost, products } } = this.props;
    const { name } = user_id || {};
    return (
      <TouchableOpacity
        onPress={this.onOpenOrderDetail}
        style={styles.item__container}>
        <View style={styles.item__view}>
          <Text>{name}</Text>
          <Text>{orderId}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

Item.propTypes = {
  data: shape({
    _id: string,
    transaction_id: string,
    user_id: shape({
      name: string,
    }),
    time: string,
    total_cost: number,
    products: arrayOf(shape({
      _id: string,
      qty: number,
    })),
    paid_off: bool,
  }),
  storeOpenedOrder: func,
};

const mapDispatchToProps = dispatch => ({
  storeOpenedOrder: (checkoutId, name, paid_off) => dispatch(CheckoutActions.storeOpenedOrder(checkoutId, name, paid_off)),
});

export default connect(null, mapDispatchToProps)(withNavigation(Item));
