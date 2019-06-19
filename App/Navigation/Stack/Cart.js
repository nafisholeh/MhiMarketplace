import React, { Component } from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation'

import { Images } from 'Themes';
import { tabNavOptions } from '../Tabs/Options';
import styles from '../Styles/NavigationStyles'

import Cart from 'Containers/Cart/Cart';

const CartNav = createStackNavigator({
  Cart: { screen: Cart },
}, {
  initialRouteName: 'Cart',
  navigationOptions: {
    headerStyle: styles.header
  }
})

CartNav.navigationOptions = (data) => tabNavOptions(data, Images.cart)

export default CartNav;
