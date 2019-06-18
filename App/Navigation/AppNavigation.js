import React, { Component } from 'react';
import { Image } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation'

import ConsumerNavigation from './ConsumerNavigation';
import CourierNavigation from './CourierNavigation';

const PrimarySwitchNavigator = createSwitchNavigator(
  {
    ConsumerNav: { screen: ConsumerNavigation },
    CourierNav: { screen: CourierNavigation },
  },
  {
    initialRouteName: 'ConsumerNav',
  }
)

export default createAppContainer(PrimarySwitchNavigator);
