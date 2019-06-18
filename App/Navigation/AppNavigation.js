import React, { Component } from 'react';
import { Image } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation'

import ConsumerNavigation from './ConsumerNavigation';
import CourierNavigation from './CourierNavigation';

import { isKurir } from 'Redux/SessionRedux';

const PrimarySwitchNavigator = createSwitchNavigator(
  {
    ConsumerNav: { screen: ConsumerNavigation },
    CourierNav: { screen: CourierNavigation },
  },
  {
    initialRouteName: isKurir() ? 'CourierNav' : 'ConsumerNav',
  }
)

export default createAppContainer(PrimarySwitchNavigator);
