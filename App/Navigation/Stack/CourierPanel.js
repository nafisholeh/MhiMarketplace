import React, { Component } from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation'

import { Images } from 'Themes';
import { tabNavOptions } from '../Tabs/Options';
import styles from '../Styles/NavigationStyles'

import OrderPanel from 'Containers/OrderPanel';
import OrderDetail from 'Containers/Order/Detail';
import ReadyToProcessDetail from 'Containers/CourierOrder/ReadyToProcess/Detail';
import Processing from 'Containers/CourierOrder/Processing';
import ProcessingDetail from 'Containers/CourierOrder/Processing/Detail';
import ReadyToSend from 'Containers/CourierOrder/ReadyToSend';
import ReadyToSendDetail from 'Containers/CourierOrder/ReadyToSend/Detail';
import Sending from 'Containers/CourierOrder/Sending';
import SendingDetail from 'Containers/CourierOrder/Sending/Detail';
import Sent from 'Containers/CourierOrder/Sent';
import SentDetail from 'Containers/CourierOrder/Sent/Detail';
import Completed from 'Containers/CourierOrder/Completed';
import CompletedDetail from 'Containers/CourierOrder/Completed/Detail';

const OrderNav = createStackNavigator({
  OrderPanel: { screen: OrderPanel }, 
  OrderDetail: { screen: OrderDetail },
  ReadyToProcessDetail: { screen: ReadyToProcessDetail },
  Processing: { screen: Processing },
  ProcessingDetail: { screen: ProcessingDetail },
  ReadyToSend: { screen: ReadyToSend },
  ReadyToSendDetail: { screen: ReadyToSendDetail },
  Sending: { screen: Sending },
  SendingDetail: { screen: SendingDetail },
  Sent: { screen: Sent },
  SentDetail: { screen: SentDetail },
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
