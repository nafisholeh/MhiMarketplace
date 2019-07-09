import React, { Component } from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation'

import { Images } from 'Themes';
import { tabNavOptions } from '../Tabs/Options';
import styles from '../Styles/NavigationStyles'

import Detail from 'Containers/Product/Detail'
import ConsumerProductList from 'Containers/ConsumerProductList';

const ProductListConsumer = createStackNavigator({
  ProductList: { screen: ConsumerProductList },
  ProductDetail: { screen: Detail },
}, {
  initialRouteName: 'ProductList',
  navigationOptions: {
    headerStyle: styles.header
  }
})

ProductListConsumer.navigationOptions = (data) => tabNavOptions(data, Images.product_list)

export default ProductListConsumer;
