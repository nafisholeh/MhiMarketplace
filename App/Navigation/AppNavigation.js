import React, { Component } from 'react';
import { Image } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation'
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs'

import { Images, Colors } from 'Themes';
import AppConfig from 'Config/AppConfig'
import { setTabBarHide } from 'Lib'

import Signin from 'Containers/Signin/Signin'
import Signup from 'Containers/Signup/Signup'
import Setup from 'Containers/Setup/Setup'
import Home from 'Containers/Home/Home'
import HomeKeuangan from 'Containers/Home/HomeKeuangan'
import HomeUser from 'Containers/Home/HomeUser'
import Detail from 'Containers/Product/Detail'
import ProductAdd from 'Containers/Product/Add';
import ProductEdit from 'Containers/Product/Edit'; 
import Cart from 'Containers/Cart/Cart'
import Checkout from 'Containers/Checkout/Checkout'
import AddressList from 'Containers/Address/AddressList';
import AddressInput from 'Containers/Address/AddressInput';
import Slip from 'Containers/Slip/Slip';
import Account from 'Containers/Account/Account';
import OrderDetail from 'Containers/Order/Detail';

import styles from './Styles/NavigationStyles'

const customNavOptions = ({ navigation }, icon) => {
  return {
    tabBarVisible: setTabBarHide(navigation, AppConfig.hiddenTabScreen),
    tabBarIcon: ({ focused, tintColor }) => (
      <Image
        source={icon}
        resizeMode='contain'
        style={{ height: 16, width: 16 }}
      />
    ),
    tabBarOptions: {
      activeTintColor: Colors.green_light,
      inactiveTintColor: Colors.brown_light,
      activeBackgroundColor: Colors.white,
      inactiveBackgroundColor: Colors.white,
      style: { borderTopWidth: 0, borderColor: Colors.white },
    },
  }
}

const HomeNav = createStackNavigator({
  Home: { screen: Home },
  HomeKeuangan: { screen: HomeKeuangan },
  HomeUser: { screen: HomeUser },
  ProductDetail: { screen: Detail },
  ProductAdd: { screen: ProductAdd },
  ProductEdit: { screen: ProductEdit },
  Cart: { screen: Cart },
  Checkout: { screen: Checkout },
  AddressList: { screen: AddressList },
  AddressInput: { screen: AddressInput },
  Signin: { screen: Signin },
  Signup: { screen: Signup },  
  Setup: { screen: Setup },
  Slip: { screen: Slip },
  OrderDetail: { screen: OrderDetail },
}, {
  initialRouteName: 'Setup',
  navigationOptions: {
    headerStyle: styles.header
  }
})

HomeNav.navigationOptions = (data) => customNavOptions(data, Images.home)

const CartNav = createStackNavigator({
  Cart: { screen: Cart },
}, {
  initialRouteName: 'Cart',
  navigationOptions: {
    headerStyle: styles.header
  }
})

CartNav.navigationOptions = (data) => customNavOptions(data, Images.cart)

const AccountNav = createStackNavigator({
  Account: { screen: Account },
}, {
  initialRouteName: 'Account',
  navigationOptions: {
    headerStyle: styles.header
  }
})

AccountNav.navigationOptions = (data) => customNavOptions(data, Images.user)

const PrimaryTabNav = createBottomTabNavigator(
  {
    Home: { screen: HomeNav },
    Cart: { screen: CartNav },
    Account: { screen: AccountNav },
  },
  {
    initialRouteName: 'Home'
  }
)

// it actually styles it's parent navigator, i.e. PrimaryNav
PrimaryTabNav.navigationOptions = ({ navigation }) => {
  return {
    gesturesEnabled: false
  }
}

export default createAppContainer(PrimaryTabNav);