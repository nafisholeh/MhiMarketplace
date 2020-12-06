import '../Config';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { YellowBox } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import { ApolloProvider } from 'react-apollo';

import DebugConfig from '../Config/DebugConfig';
import RootContainer from './RootContainer';
import createStore from '../Redux';
import ApolloClientProvider from 'Services/ApolloClientProvider';
import { InAppNotification } from 'Lib';

// create our store
export const store = createStore();

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */

console.disableYellowBox = true;

class App extends Component {
  constructor(props) {
    super(props);
    YellowBox.ignoreWarnings([
      'Warning: isMounted(...) is deprecated',
      'Module RCTImageLoader',
      'Require cycle',
    ]);
  }

  render() {
    return (
      <ApolloProvider client={ApolloClientProvider.client}>
        <Provider store={store}>
          <RootContainer />
        </Provider>
        <DropdownAlert
          ref={(ref) => InAppNotification.setDropDown(ref)}
          closeInterval={10000}
        />
      </ApolloProvider>
    );
  }
}

// allow reactotron overlay for fast design in dev mode
export default DebugConfig.useReactotron ? console.tron.overlay(App) : App;
