import React, { Component } from 'react';
import { Image } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation'

import ConsumerNavigation from './Tabs/ConsumerNavigation'
import CourierNavigation from './Tabs/CourierNavigation';
import FinanceNavigation from './Tabs/FinanceNavigation';
import StockOpnameNavigation from './Tabs/StockOpnameNavigation';

import { isKurir, isStokOpname, isKeuangan } from 'Redux/SessionRedux';

const getInitialRouteName = () => {
  if (isKurir()) return 'CourierNav';
  else if (isStokOpname()) return 'StockOpnameNav';
  else if (isKeuangan()) return 'FinanceNav';
  else return 'ConsumerNav';
}

const PrimarySwitchNavigator = createSwitchNavigator(
  {
    ConsumerNav: { screen: ConsumerNavigation },
    CourierNav: { screen: CourierNavigation },
    FinanceNav: { screen: FinanceNavigation },
    StockOpnameNav: { screen: StockOpnameNavigation },
  },
  {
    initialRouteName: getInitialRouteName(),
  }
)

export default createAppContainer(PrimarySwitchNavigator);
