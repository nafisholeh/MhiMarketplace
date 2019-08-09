import React, { Component } from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs'

import styles from '../Styles/NavigationStyles'
import { tabNavOptions } from './Options';

import HomeNav from '../Stack/HomeAdmin';

const MainNavigation = createBottomTabNavigator(
  {
    Home: { screen: HomeNav },
  },
  {
    initialRouteName: 'Home',
    backBehavior: 'initialRoute',
  }
)

// it actually styles it's parent navigator, i.e. PrimaryNav
MainNavigation.navigationOptions = ({ navigation }) => {
  return {
    gesturesEnabled: false
  }
}

export default MainNavigation;
