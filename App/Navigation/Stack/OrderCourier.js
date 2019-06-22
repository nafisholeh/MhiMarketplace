import React, { Component } from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation'

import { Images } from 'Themes';
import { tabNavOptions } from '../Tabs/Options';
import styles from '../Styles/NavigationStyles'

import OrderPanel from 'Containers/OrderPanel';
import OrderDetail from 'Containers/Order/Detail';
import ReadyToProcessDetail from 'Containers/Courier/ReadyToProcess/Detail';
import Processing from 'Containers/Courier/Processing';
import ProcessingDetail from 'Containers/Courier/Processing/Detail';
import ReadyToSend from 'Containers/Courier/ReadyToSend';
import ReadyToSendDetail from 'Containers/Courier/ReadyToSend/Detail';
import Completed from 'Containers/Courier/Completed';
import CompletedDetail from 'Containers/Courier/Completed/Detail';

const OrderNav = createStackNavigator({
  OrderPanel: { screen: OrderPanel }, 
  OrderDetail: { screen: OrderDetail },
  ReadyToProcessDetail: { screen: ReadyToProcessDetail },
  Processing: { screen: Processing },
  ProcessingDetail: { screen: ProcessingDetail },
  ReadyToSend: { screen: ReadyToSend },
  ReadyToSendDetail: { screen: ReadyToSendDetail },
  Completed: { screen: Completed },
  CompletedDetail: { screen: CompletedDetail },
}, {
  initialRouteName: 'OrderPanel',
  navigationOptions: {
    headerStyle: styles.header
  }
})

OrderNav.navigationOptions = (data) => tabNavOptions(data, Images.shipping)

export default OrderNav;
