import React, { Component } from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation'

import { Images } from 'Themes';
import { tabNavOptions } from '../Tabs/Options';
import styles from '../Styles/NavigationStyles'

import Cart from 'Containers/Cart/Cart';
import Checkout from 'Containers/Checkout/Checkout';
import AddressList from 'Containers/Address/AddressList';
import AddressInput from 'Containers/Address/AddressInput';
import Slip from 'Containers/Slip/Slip';

const CartNav = createStackNavigator({
  Cart: { screen: Cart },
  Checkout: { screen: Checkout },
  AddressList: { screen: AddressList },
  AddressInput: { screen: AddressInput },
  Slip: { screen: Slip },
}, {
  initialRouteName: 'Slip',
  navigationOptions: {
    headerStyle: styles.header
  }
})

CartNav.navigationOptions = (data) => tabNavOptions(data, Images.cart)

export default CartNav;
