import React, { Component } from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation'

import { Images } from 'Themes';
import { tabNavOptions } from '../Tabs/Options';
import styles from '../Styles/NavigationStyles'

import Signin from 'Containers/Signin/Signin'
import Signup from 'Containers/Signup/Signup'
import Home from 'Containers/HomeConsumer'
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
import ConsumerOrder from 'Containers/ConsumerOrder';
import ConsumerCompleted from 'Containers/ConsumerCompleted';

const HomeNav = createStackNavigator({
  Home: { screen: Home },
  ProductDetail: { screen: Detail },
  ProductAdd: { screen: ProductAdd },
  ProductEdit: { screen: ProductEdit },
  Cart: { screen: Cart },
  Checkout: { screen: Checkout },
  AddressList: { screen: AddressList },
  AddressInput: { screen: AddressInput },
  Signin: { screen: Signin },
  Signup: { screen: Signup },  
  Slip: { screen: Slip },
  OrderDetail: { screen: OrderDetail },
  ConsumerOrder: { screen: ConsumerOrder },
  ConsumerCompleted: { screen: ConsumerCompleted },
}, {
  initialRouteName: 'Home',
  navigationOptions: {
    headerStyle: styles.header
  }
})

HomeNav.navigationOptions = (data) => tabNavOptions(data, Images.home)

export default HomeNav;
