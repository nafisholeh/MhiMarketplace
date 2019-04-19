import React, { Component } from 'react';
import { Image } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation'
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs'

import { Images, Colors } from 'Themes';
import AppConfig from 'Config/AppConfig'
import { setTabBarHide } from 'Lib'

import Home from 'Containers/Home/Home'

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
}, {
  initialRouteName: 'Setup',
  navigationOptions: {
    headerStyle: styles.header
  }
})

HomeNav.navigationOptions = (data) => customNavOptions(data, Images.home)

const StockOpnameNavigation = createBottomTabNavigator(
  {
    Home: { screen: HomeNav },
  },
  {
    initialRouteName: 'Home'
  }
)

// it actually styles it's parent navigator, i.e. PrimaryNav
StockOpnameNavigation.navigationOptions = ({ navigation }) => {
  return {
    gesturesEnabled: false
  }
}

export default createAppContainer(StockOpnameNavigation);