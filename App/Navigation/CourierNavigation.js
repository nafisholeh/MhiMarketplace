import React, { Component } from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs'

import styles from './Styles/NavigationStyles'
import { tabNavOptions } from './TabOptions';

import AccountNav from './Stack/Account';
import CartNav from './Stack/Cart';
import HomeCourierNav from './Stack/HomeCourier';
import ShoppingCourier from './Stack/ShoppingCourier';
import Setup from 'Containers/Setup/Setup';

const CourierNavigation = createBottomTabNavigator(
  {
    Home: { screen: HomeCourierNav },
    Shopping: { screen: ShoppingCourier },
    Cart: { screen: CartNav },
    Account: { screen: AccountNav },
  },
  {
    initialRouteName: 'Home',
    backBehavior: 'initialRoute',
  }
)

// it actually styles it's parent navigator, i.e. PrimaryNav
CourierNavigation.navigationOptions = ({ navigation }) => {
  return {
    gesturesEnabled: false
  }
}

const ParentNavigator = createStackNavigator(
  {
    Setup: { screen: Setup },
    CourierNavigation: { screen: CourierNavigation },
  }, {
    initialRouteName: 'Setup',
    header: null,
    headerMode: 'none'
  }
)

export default ParentNavigator;
