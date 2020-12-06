import * as React from 'react';
import { BackHandler, Platform } from 'react-native';
import {
  createReactNavigationReduxMiddleware,
  reduxifyNavigator,
} from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';

import AppNavigation from './AppNavigation';

createReactNavigationReduxMiddleware('root', (state) => state.nav);

const ReduxAppNavigator = reduxifyNavigator(AppNavigation, 'root');

const getActiveScreenName = (obj, screenName) => {
  const { index, routes } = obj || {};
  if (index === undefined || !routes) {
    const { routeName } = obj || {};
    if (!routeName) return false;
    if (routeName === screenName) return true;
    else return false;
  }
  const result = getActiveScreenName(routes[index], screenName);
  return result;
};

class ReduxNavigation extends React.Component {
  componentDidMount() {
    if (Platform.OS === 'ios') return;
    BackHandler.addEventListener('hardwareBackPress', () => {
      const { dispatch, nav } = this.props;
      // change to whatever is your first screen, otherwise unpredictable results may occur
      if (
        getActiveScreenName(nav, 'CourierNavigation') ||
        getActiveScreenName(nav, 'ConsumerNavigation')
      ) {
        return false;
      }
      // if (shouldCloseApp(nav)) return false
      dispatch({ type: 'Navigation/BACK' });
      return true;
    });
  }

  componentWillUnmount() {
    if (Platform.OS === 'ios') return;
    BackHandler.removeEventListener('hardwareBackPress', undefined);
  }

  render() {
    const { dispatch, nav } = this.props;
    return <ReduxAppNavigator dispatch={dispatch} state={nav} />;
  }
}

const mapStateToProps = (state) => ({
  nav: state.nav,
});
export default connect(mapStateToProps)(ReduxNavigation);
