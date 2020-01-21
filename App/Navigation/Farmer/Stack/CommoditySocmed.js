import React, { Component } from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation'

import { Images } from 'Themes';
import { tabNavOptions } from 'Navigation/Tabs/Options';
import styles from 'Navigation/Styles/NavigationStyles'

import CommoditySocmed from 'SubApp/Farmer/Containers/Socmed/Commodity';
import NewsFeedDetail from 'SubApp/Farmer/Containers/Socmed/NewsFeedDetail';
import NotificationHistory from 'SubApp/Farmer/Containers/Socmed/NotificationHistory';

const StackNav = createStackNavigator({
  CommoditySocmed: { screen: CommoditySocmed },
  NewsFeedDetail: { screen: NewsFeedDetail },
  NotificationHistory: { screen: NotificationHistory },
}, {
  initialRouteName: 'CommoditySocmed',
  navigationOptions: {
    headerStyle: styles.header
  }
})

StackNav.navigationOptions = (data) => tabNavOptions(data, Images.home)

export default StackNav;
