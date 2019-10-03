import React, { Component } from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation'

import { Images } from 'Themes';
import { tabNavOptions } from '../Tabs/Options';
import styles from '../Styles/NavigationStyles';

import Account from 'Containers/Account/Account';
import Signin from 'Containers/Signin/Signin';
import Signup from 'Containers/Signup';
import SignupCustomer from 'Containers/Signup/Customer';
import SignupScholar from 'Containers/Signup/Scholar';
import ConsumerOrder from 'Containers/ConsumerOrder';
import ConsumerCompleted from 'Containers/ConsumerOrder/Completed';
import ConsumerOrderDetail from 'Containers/ConsumerOrder/Common/Detail';

import AreaCommodity from 'SubApp/Farmer/Containers/AreaCommodity';
import AreaType from 'SubApp/Farmer/Containers/AreaType';
import AreaDraw from 'SubApp/Farmer/Containers/AreaDraw';
import AreaList from 'SubApp/Farmer/Containers/AreaList';
import SignupFarmerFirst from 'SubApp/Farmer/Containers/Signup/First';
import SignupFarmerSecond from 'SubApp/Farmer/Containers/Signup/Second';
import SignupFarmerThird from 'SubApp/Farmer/Containers/Signup/Third';
import FarmerFinalConfirm from 'SubApp/Farmer/Containers/Signup/FinalConfirm';
import DashboardFarmer from 'SubApp/Farmer/Containers/Dashboard';

const AccountNav = createStackNavigator({
  Account: { screen: Account },
  Signin: { screen: Signin },
  Signup: { screen: Signup },
  SignupFarmerFirst: { screen: SignupFarmerFirst },
  SignupFarmerSecond: { screen: SignupFarmerSecond },
  SignupFarmerThird: { screen: SignupFarmerThird },
  SignupCustomer: { screen: SignupCustomer },
  SignupScholar: { screen: SignupScholar },
  ConsumerOrder: { screen: ConsumerOrder },
  ConsumerCompleted: { screen: ConsumerCompleted },
  ConsumerOrderDetail: { screen: ConsumerOrderDetail },
  AreaDraw: { screen: AreaDraw },
  AreaList: { screen: AreaList },
  AreaType: { screen: AreaType },
  AreaCommodity: { screen: AreaCommodity },
  FarmerFinalConfirm: { screen: FarmerFinalConfirm },
  DashboardFarmer: { screen: DashboardFarmer },
}, {
  initialRouteName: 'DashboardFarmer',
  navigationOptions: {
    headerStyle: styles.header
  }
})

AccountNav.navigationOptions = (data) => tabNavOptions(data, Images.user)

export default AccountNav;
