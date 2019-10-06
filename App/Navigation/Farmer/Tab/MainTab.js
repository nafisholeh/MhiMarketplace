import React, { Component } from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs'

import styles from '../../Styles/NavigationStyles'
import SopStack from '../Stack/Sop';
import AccountStack from '../Stack/Account';

const TabNav = createBottomTabNavigator(
  {
    SOP: { screen: SopStack },
    Account: { screen: AccountStack },
  },
  {
    initialRouteName: 'SOP',
    backBehavior: 'initialRoute',
  }
)

// it actually styles it's parent navigator, i.e. PrimaryNav
TabNav.navigationOptions = ({ navigation }) => {
  return {
    gesturesEnabled: false
  }
}

export default TabNav;
