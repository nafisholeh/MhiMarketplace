import React, { Component } from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation'

import { Images } from 'Themes';
import { tabNavOptions } from 'Navigation/Tabs/Options';
import styles from 'Navigation/Styles/NavigationStyles'

import CommoditySocmed from 'SubApp/Farmer/Containers/CommoditySocmed';

const StackNav = createStackNavigator({
  CommoditySocmed: { screen: CommoditySocmed },
}, {
  initialRouteName: 'CommoditySocmed',
  navigationOptions: {
    headerStyle: styles.header
  }
})

StackNav.navigationOptions = (data) => tabNavOptions(data, Images.home)

export default StackNav;
