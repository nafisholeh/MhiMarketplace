import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { bool, func } from 'prop-types';
import { createStructuredSelector } from 'reselect';
import OneSignal from 'react-native-onesignal';

import ReduxNavigation from '../Navigation/ReduxNavigation';
import StartupActions from '../Redux/StartupRedux';
import ReduxPersist from '../Config/ReduxPersist';
import styles from './Styles/RootContainerStyles';
import { isRehydrated } from 'Redux/StartupRedux';
import { store } from 'Containers/App';
import OneSignalActions from '../Redux/OneSignalRedux';
import { withOneSignalListener } from 'RootHoc';
// import { AppConfigSettings } from 'Components';

class RootContainer extends Component {
  componentDidMount() {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup();
    }
  }

  componentDidUpdate(prevProps) {
    const { isReduxRehydrated } = this.props;
    if (prevProps.isReduxRehydrated !== isReduxRehydrated) {
      if (isReduxRehydrated) {
        OneSignal.addEventListener('ids', this.onOneSignalIdsReceived);
        OneSignal.configure();
      }
    }
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('ids', this.onOneSignalIdsReceived);
  }

  // eslint-disable-next-line no-undef
  onOneSignalIdsReceived = (device) => {
    const { userId } = device;
    store.dispatch(OneSignalActions.storeNotifId(userId));
  };

  render() {
    const { isReduxRehydrated } = this.props;
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle="light-content" />
        {isReduxRehydrated && <ReduxNavigation />}
        {/* <AppConfigSettings /> */}
      </View>
    );
  }
}

RootContainer.propTypes = {
  isReduxRehydrated: bool,
  startup: func,
};

const mapStateToProps = createStructuredSelector({
  isReduxRehydrated: isRehydrated(),
});

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withOneSignalListener(RootContainer));
