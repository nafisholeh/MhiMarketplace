import React, { Component } from 'react';
import { Image } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation'

import ConsumerNavigation from './Tabs/ConsumerNavigation'
import CourierNavigation from './Tabs/CourierNavigation';
import FinanceNavigation from './Tabs/FinanceNavigation';
import StockOpnameNavigation from './Tabs/StockOpnameNavigation';
import AdminNavigation from './Tabs/AdminNavigation';
import FarmerNavigation from './Farmer/Tab/MainTab';

import { store } from 'Containers/App';
import Setup from 'Containers/Setup/Setup';
import SubAppChooser from 'Containers/Setup/SubAppChooser';

const PrimarySwitchNavigator = createSwitchNavigator(
  {
    Setup: { screen: Setup },
    SubAppChooser: { screen: SubAppChooser },
    ConsumerNav: { screen: ConsumerNavigation },
    CourierNav: { screen: CourierNavigation },
    FinanceNav: { screen: FinanceNavigation },
    StockOpnameNav: { screen: StockOpnameNavigation },
    AdminNav: { screen: AdminNavigation },
    FarmerNav: { screen: FarmerNavigation },
  },
  {
    initialRouteName: 'Setup',
  }
)

export default createAppContainer(PrimarySwitchNavigator);
