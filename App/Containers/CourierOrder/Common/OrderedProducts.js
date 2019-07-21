import React, { Component } from 'react';
import { FlatList, View, Text, CheckBox, TouchableOpacity } from 'react-native';
import { arrayOf, shape, string, number, bool, func } from 'prop-types';

import { calcDiscount, parseToRupiah } from 'Lib';
import { Colors } from 'Themes';

class OrderedProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
    };
  }
  
  componentDidMount() {
    this.initSelected();
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.products !== this.props.products) {
      this.initSelected();
    }
  }
  
  initSelected = () => {
    const { products = [] } = this.props;
    if (Array.isArray(products) && products.length) {
      let selected = [];
      products.forEach(item => {
        selected.push(false);
      });
      this.setState({ selected });
    }
  };

  toggleSelect = (index, state) => {
    const { selected = [] } = this.state;
    const { onSelectionChange } = this.props;
    this.setState({
      selected: [
        ...selected.slice(0, index),
        state,
        ...selected.slice(index + 1, selected.length)
      ]
    }, () => {
      if (onSelectionChange) onSelectionChange(this.state.selected);
    });
  }
  
  renderItem = ({ item, index }) => {
    const { selectable, onSelectionChange } = this.props;
    const { selected = [] } = this.state;
    const {
      _id: productId,
      product: {
        title,
        photo,
        price,
        discount = 0,
      } = {},
      qty = 0,
    } = item || {};
    const totalPrice = price - calcDiscount(price, discount) * qty;
    return (
      <TouchableOpacity 
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderWidth: 0.5,
          borderColor: Colors.brown_light,
          padding: 5,
        }}
        onPress={() => this.toggleSelect(index, !selected[index])}
      >
        <Text>{title}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View>
            <Text style={{ textAlign: 'right' }}>{qty} pcs</Text>
            <Text style={{ textAlign: 'right' }}>{parseToRupiah(totalPrice)}</Text>
          </View>
          {selectable && (
            <CheckBox
              onValueChange={state => this.toggleSelect(index, state)}
              value={selected[index]}
            />
          )}
        </View>
      </TouchableOpacity>
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
  })),
  selectable: bool,
  onSelectionChange: func,
};

export default OrderedProducts;
