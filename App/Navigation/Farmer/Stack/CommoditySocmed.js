import React, { Component } from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation'

import { Images } from 'Themes';
import { tabNavOptions } from 'Navigation/Tabs/Options';
import styles from 'Navigation/Styles/NavigationStyles'

import CommoditySocmed from 'SubApp/Farmer/Containers/Socmed/Commodity';
import NewsFeedComments from 'SubApp/Farmer/Containers/Socmed/NewsFeedComments';

const StackNav = createStackNavigator({
  CommoditySocmed: { screen: CommoditySocmed },
  NewsFeedComments: { screen: NewsFeedComments },
}, {
  initialRouteName: 'NewsFeedComments',
  navigationOptions: {
    headerStyle: styles.header
  }
})

StackNav.navigationOptions = (data) => tabNavOptions(data, Images.home)

export default StackNav;
