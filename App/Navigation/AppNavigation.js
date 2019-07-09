import React, { Component } from 'react';
import { Image } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation'

import ConsumerNavigation from './Tabs/ConsumerNavigation'
import CourierNavigation from './Tabs/CourierNavigation';
import FinanceNavigation from './Tabs/FinanceNavigation';
import StockOpnameNavigation from './Tabs/StockOpnameNavigation';

import { store } from 'Containers/App';
import Setup from 'Containers/Setup/Setup';

const PrimarySwitchNavigator = createSwitchNavigator(
  {
    Setup: { screen: Setup },
    ConsumerNav: { screen: ConsumerNavigation },
    CourierNav: { screen: CourierNavigation },
    FinanceNav: { screen: FinanceNavigation },
    StockOpnameNav: { screen: StockOpnameNavigation },
  },
  {
    initialRouteName: 'Setup',
  }
)

export default createAppContainer(PrimarySwitchNavigator);
