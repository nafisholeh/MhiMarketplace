import React, { Component } from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs'

import styles from './Styles/NavigationStyles'
import { tabNavOptions } from './TabOptions';

import AccountNav from './Stack/Account';
import CartNav from './Stack/Cart';
import HomeConsumerNav from './Stack/HomeConsumer';

const ConsumerNavigation = createBottomTabNavigator(
  {
    Home: { screen: HomeConsumerNav },
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