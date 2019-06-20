import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
import { arrayOf, shape, string, number } from 'prop-types';

import { calcDiscount, parseToRupiah } from 'Lib';
import { Colors } from 'Themes';

class OrderedProducts extends Component {
  renderItem = ({ item, index }) => {
    const {
      product: {
        title,
        photo,
        price,
        discount = 0,
        unit = 'kg'
      } = {},
      qty = 0,
    } = item || {};
    const totalPrice = price - calcDiscount(price, discount) * qty;
    return (
      <View 
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderWidth: 0.5,
          borderColor: Colors.brown_light,
          padding: 5,
        }}
      >
        <Text>{title}</Text>
        <View>
          <Text style={{ textAlign: 'right' }}>{qty} {unit}</Text>
          <Text style={{ textAlign: 'right' }}>{parseToRupiah(totalPrice)}</Text>
        </View>
      </View>
    );
  };

  render() {
    const { products = [] } = this.props;
    if (!Array.isArray(products) || !products.length) return null;
    return (
      <FlatList
        keyExtractor={(item, id) => item._id.toString()}
        data={products} 
        renderItem={this.renderItem}
        style={{ marginBottom: 10 }}
      />
    );
  }
}

OrderedProducts.propTypes = {
  products: arrayOf(shape({
    _id: string,
    product: shape({
      _id: string,
      title: string,
      photo: string,
      price: number,
      discount: number,
      unit: string,
    }),
    qty: number,
  }))
};

export default OrderedProducts;
