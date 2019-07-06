import React, { Component } from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation'

import { Images } from 'Themes';
import { tabNavOptions } from '../Tabs/Options';
import styles from '../Styles/NavigationStyles'

import Home from 'Containers/HomeStockOpname'
import Detail from 'Containers/Product/Detail'
import ProductAdd from 'Containers/Product/Add';
import ProductEdit from 'Containers/Product/Edit'; 

const HomeNav = createStackNavigator({
  HomeStockOpname: { screen: Home },
  ProductDetail: { screen: Detail },
  ProductAdd: { screen: ProductAdd },
  ProductEdit: { screen: ProductEdit },
}, {
  initialRouteName: 'HomeStockOpname',
  navigationOptions: {
    headerStyle: styles.header
  }
})

HomeNav.navigationOptions = (data) => tabNavOptions(data, Images.home)

export default HomeNav;
