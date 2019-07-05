import React, { Component } from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation'

import { Images } from 'Themes';
import { tabNavOptions } from '../Tabs/Options';
import styles from '../Styles/NavigationStyles';

import Account from 'Containers/Account/Account';
import Signin from 'Containers/Signin/Signin';
import Signup from 'Containers/Signup/Signup';
import ConsumerOrder from 'Containers/ConsumerOrder';
import ConsumerCompleted from 'Containers/ConsumerOrder/Completed';
import ConsumerOrderDetail from 'Containers/ConsumerOrder/Common/Detail';
import ConsumerSendingDetail from 'Containers/ConsumerOrder/Sending/Detail';

const AccountNav = createStackNavigator({
  Account: { screen: Account },
  Signin: { screen: Signin },
  Signup: { screen: Signup },
  ConsumerOrder: { screen: ConsumerOrder },
  ConsumerCompleted: { screen: ConsumerCompleted },
  ConsumerOrderDetail: { screen: ConsumerOrderDetail },
  ConsumerSendingDetail: { screen: ConsumerSendingDetail },
}, {
  initialRouteName: 'Account',
  navigationOptions: {
    headerStyle: styles.header
  }
})

AccountNav.navigationOptions = (data) => tabNavOptions(data, Images.user)

export default AccountNav;
