import React, { Component } from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation'

import { Images } from 'Themes';
import { tabNavOptions } from '../TabOptions';
import styles from '../Styles/NavigationStyles';

import Account from 'Containers/Account/Account';

const AccountNav = createStackNavigator({
  Account: { screen: Account },
}, {
  initialRouteName: 'Account',
  navigationOptions: {
    headerStyle: styles.header
  }
})

AccountNav.navigationOptions = (data) => tabNavOptions(data, Images.user)

export default AccountNav;
