import React, { Component } from 'react';
import { Image } from 'react-native';

import { Colors } from 'Themes';
import AppConfig from 'Config/AppConfig'
import { setTabBarHide } from 'Lib'

export const tabNavOptions = ({ navigation }, icon) => {
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
