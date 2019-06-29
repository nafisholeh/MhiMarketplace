import React, { Component } from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs'

import styles from '../Styles/NavigationStyles'
import { tabNavOptions } from './Options';

import AccountNav from '../Stack/Account';
import CartNav from '../Stack/Cart';
import HomeNav from '../Stack/HomeConsumer';
import ProductListNav from '../Stack/ProductListConsumer';
import Setup from 'Containers/Setup/Setup';

const ConsumerNavigation = createBottomTabNavigator(
  {
    Home: { screen: HomeNav },
    Store: { screen: ProductListNav },
    Cart: { screen: CartNav },
    Account: { screen: AccountNav },
  },
  {
    initialRouteName: 'Home',
    backBehavior: 'initialRoute',
  }
)

// it actually styles it's parent navigator, i.e. PrimaryNav
ConsumerNavigation.navigationOptions = ({ navigation }) => {
  return {
    gesturesEnabled: false
  }
}

export default ConsumerNavigation;
