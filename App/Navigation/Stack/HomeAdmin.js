import React, { Component } from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation'

import { Images } from 'Themes';
import { tabNavOptions } from '../Tabs/Options';
import styles from '../Styles/NavigationStyles'

import Home from 'Containers/HomeAdmin';
import EventInput from 'Containers/Event/Input';

const HomeNav = createStackNavigator({
  HomeAdmin: { screen: Home },
  EventInput: { screen: EventInput },
}, {
  initialRouteName: 'HomeAdmin',
  navigationOptions: {
    headerStyle: styles.header
  }
})

HomeNav.navigationOptions = (data) => tabNavOptions(data, Images.home)

export default HomeNav;
