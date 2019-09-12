import React, { Component } from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation'

import { Images } from 'Themes';
import { tabNavOptions } from '../Tabs/Options';
import styles from '../Styles/NavigationStyles';

import Account from 'Containers/Account/Account';
import Signin from 'Containers/Signin/Signin';
import Signup from 'Containers/Signup';
import SignupFarmer from 'Containers/Signup/Farmer';
import SignupCustomer from 'Containers/Signup/Customer';
import SignupScholar from 'Containers/Signup/Scholar';
import ConsumerOrder from 'Containers/ConsumerOrder';
import ConsumerCompleted from 'Containers/ConsumerOrder/Completed';
import ConsumerOrderDetail from 'Containers/ConsumerOrder/Common/Detail';

const AccountNav = createStackNavigator({
  Account: { screen: Account },
  Signin: { screen: Signin },
  Signup: { screen: Signup },
  SignupFarmer: { screen: SignupFarmer },
  SignupCustomer: { screen: SignupCustomer },
  SignupScholar: { screen: SignupScholar },
  ConsumerOrder: { screen: ConsumerOrder },
  ConsumerCompleted: { screen: ConsumerCompleted },
  ConsumerOrderDetail: { screen: ConsumerOrderDetail },
}, {
  initialRouteName: 'Signup',
  navigationOptions: {
    headerStyle: styles.header
  }
})

AccountNav.navigationOptions = (data) => tabNavOptions(data, Images.user)

export default AccountNav;
