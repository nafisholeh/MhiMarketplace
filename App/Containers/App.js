import '../Config'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { YellowBox } from 'react-native'
import DropdownAlert from 'react-native-dropdownalert'
import { ApolloProvider } from 'react-apollo'
import OneSignal from 'react-native-onesignal';

import DebugConfig from '../Config/DebugConfig'
import RootContainer from './RootContainer'
import createStore from '../Redux'
import ApolloClientProvider from 'Services/ApolloClientProvider'
import { InAppNotification } from 'Lib';
import AppConfig from "Config/AppConfig";
import { cacheNewOrder } from 'Containers/CourierOrder/ReadyToProcess/Helper';
import { cacheNewComment, cacheNewReplyComment } from 'GraphQL/Farmer/CacheMutation';
import { openFeedDetail } from "Navigation/NotificationRouter/SocialFeed";

// create our store
export const store = createStore()

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
class App extends Component {
  constructor(props) {
    super(props);
    YellowBox.ignoreWarnings(
        ['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader', 'Require cycle'
      ]);
    OneSignal.init(AppConfig.oneSignalKey);
    OneSignal.inFocusDisplaying(2);
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
  }
  
  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
  }
  
  onReceived(notification) {
    const { payload = {} } = notification || {};
    const { additionalData = {} } = payload || {};
    const { __purpose } = additionalData || {};
    switch (__purpose) {
      case AppConfig.notifPurpose.NEW_ORDER:
        cacheNewOrder(additionalData);
        break;
      case AppConfig.notifPurpose.REPLY_POST:
        cacheNewComment(additionalData);
        break;
      case AppConfig.notifPurpose.REPLY_COMMENT:
        cacheNewReplyComment(additionalData);
        break;
      default:
        break;
    }
  }

  onOpened(openResult) {
    const { notification: { payload: { additionalData } = {} } = {} } = openResult || {};
    const { __purpose } = additionalData || {};
    switch (__purpose) {
      case AppConfig.notifPurpose.REPLY_POST:
      case AppConfig.notifPurpose.REPLY_COMMENT:
        openFeedDetail(additionalData);
        break;
      default:
        break;
    }
  }
  
  render () {
    return (
      <ApolloProvider client={ApolloClientProvider.client}>
        <Provider store={store}>
          <RootContainer />
        </Provider>
        <DropdownAlert
          ref={ref => InAppNotification.setDropDown(ref)}
          closeInterval={10000}
        />
      </ApolloProvider>
    )
  }
}

// allow reactotron overlay for fast design in dev mode
export default DebugConfig.useReactotron
  ? console.tron.overlay(App)
  : App
