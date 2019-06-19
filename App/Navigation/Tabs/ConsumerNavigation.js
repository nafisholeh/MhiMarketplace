import React, { Component } from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs'

import styles from '../Styles/NavigationStyles'
import { tabNavOptions } from './Options';

import AccountNav from '../Stack/Account';
import CartNav from '../Stack/Cart';
import HomeNav from '../Stack/HomeConsumer';
import Setup from 'Containers/Setup/Setup';

const ConsumerNavigation = createBottomTabNavigator(
  {
    Home: { screen: HomeNav },
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

const ParentNavigator = createStackNavigator(
  {
    Setup: { screen: Setup },
    ConsumerNavigation: { screen: ConsumerNavigation },
  }, {
    initialRouteName: 'Setup',
    header: null,
    headerMode: 'none'
  }
)

export default ParentNavigator;
