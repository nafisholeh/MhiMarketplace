import React, { Component } from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation'

import { Images } from 'Themes';
import { tabNavOptions } from 'Navigation/Tabs/Options';
import styles from 'Navigation/Styles/NavigationStyles'

import SopFarmer from 'SubApp/Farmer/Containers/Dashboard';
import SopViewer from 'SubApp/Farmer/Containers/SopViewer';

const StackNav = createStackNavigator({
  SopFarmer: { screen: SopFarmer },
  SopViewer: { screen: SopViewer },
}, {
  initialRouteName: 'SopFarmer',
  navigationOptions: {
    headerStyle: styles.header
  }
})

StackNav.navigationOptions = (data) => tabNavOptions(data, Images.home)

export default StackNav;
