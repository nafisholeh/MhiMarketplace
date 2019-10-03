import React, { Component } from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation'

import { Images } from 'Themes';
import { tabNavOptions } from '../Tabs/Options';
import styles from '../Styles/NavigationStyles'

import DashboardFarmer from 'SubApp/Farmer/Containers/Dashboard';

const HomeNav = createStackNavigator({
  DashboardFarmer: { screen: DashboardFarmer },
}, {
  initialRouteName: 'DashboardFarmer',
  navigationOptions: {
    headerStyle: styles.header
  }
})

HomeNav.navigationOptions = (data) => tabNavOptions(data, Images.home)

export default HomeNav;
