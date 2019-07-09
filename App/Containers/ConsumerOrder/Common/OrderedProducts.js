import React, { Component } from 'react';
import { FlatList, View, Text, CheckBox, TouchableOpacity } from 'react-native';
import { arrayOf, shape, string, number, bool, func } from 'prop-types';

import { ViewShadow } from 'Components';
import { calcDiscount, parseToRupiah, screenWidth, moderateScale } from 'Lib';
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
        unit = 'kg'
      } = {},
      qty = 0,
    } = item || {};
    const totalPrice = price - calcDiscount(price, discount) * qty;
    return (
      <ViewShadow
        width={screenWidth - 60}
        height={60}
        borderRadius={10}
        shadowBorderRadiusAndroid={10}
        shadowRadiusAndroid={7}
        shadowOpacityAndroid={0.09}
        mainColor={Colors.white}
        shadowColor={Colors.brown_light}
        style={{
          marginHorizontal: moderateScale(18),
          marginTop: moderateScale(4),
          marginBottom: moderateScale(4),
        }}
        styleChildren={{
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity 
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: moderateScale(10),
          }}
          onPress={() => this.toggleSelect(index, !selected[index])}
        >
          <View
            style={{
              flex: 0.8,
            }}
          >
            <Text
              style={{
                fontFamily: 'CircularStd-Book',
                fontSize: 14,
                color: Colors.text_dark,
              }}
              numberOfLines={2}
            >
              {title}
            </Text>
          </View>
          <View
            style={{
              flex: 0.2,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <View>
              <Text
                style={{
                  textAlign: 'right',
                  fontFamily: 'CircularStd-Book',
                  fontSize: 14,
                  color: Colors.text_light,
                }}
                numberOfLines={1}
              >
                {qty} {unit}
              </Text>
              <Text
                style={{
                  textAlign: 'right',
                  fontFamily: 'CircularStd-Book',
                  fontSize: 14,
                  color: Colors.text_light,
                }}
                numberOfLines={1}
              >
                {parseToRupiah(totalPrice, null, true)}
              </Text>
            </View>
            {selectable && (
              <CheckBox
                onValueChange={state => this.toggleSelect(index, state)}
                value={selected[index]}
              />
            )}
          </View>
        </TouchableOpacity>
      </ViewShadow>
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
