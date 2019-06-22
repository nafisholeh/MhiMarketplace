import React, { Component } from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs'

import styles from '../Styles/NavigationStyles'
import { tabNavOptions } from './Options';

import AccountNav from '../Stack/Account';
import HomeNav from '../Stack/HomeCourier';
import OrderNav from '../Stack/OrderCourier'
import ShoppingCourier from '../Stack/ShoppingCourier';
import Setup from 'Containers/Setup/Setup';

const CourierNavigation = createBottomTabNavigator(
  {
    Home: { screen: HomeNav },
    Orders: { screen: OrderNav },
    Shopping: { screen: ShoppingCourier },
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

export default CourierNavigation;
