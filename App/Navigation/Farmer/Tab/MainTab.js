import React, { Component } from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs'

import styles from '../../Styles/NavigationStyles'
import SopStack from '../Stack/Sop';
import CommoditySocmedStack from '../Stack/CommoditySocmed';
import AccountStack from '../Stack/Account';

const TabNav = createBottomTabNavigator(
  {
    Komoditas: { screen: CommoditySocmedStack },
    SOP: { screen: SopStack },
    Account: { screen: AccountStack },
  },
  {
    initialRouteName: 'Komoditas',
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
