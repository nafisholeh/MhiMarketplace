import React, { Component } from "react";
import { View, StatusBar } from "react-native";
import { connect } from "react-redux";
import { bool } from "prop-types";
import { createStructuredSelector } from "reselect";
import OneSignal from "react-native-onesignal";

import ReduxNavigation from "../Navigation/ReduxNavigation";
import StartupActions from "../Redux/StartupRedux";
import ReduxPersist from "../Config/ReduxPersist";
import styles from "./Styles/RootContainerStyles";
import { isRehydrated } from "Redux/StartupRedux";
import { store } from "Containers/App";
import OneSignalActions from "../Redux/OneSignalRedux";
import { withOneSignalListener } from "RootHoc";

class RootContainer extends Component {
  componentDidMount() {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup();
    }
  }

  componentDidUpdate(prevProps) {
    const { isRehydrated } = this.props;
    if (prevProps.isRehydrated !== isRehydrated) {
      if (isRehydrated) {
        OneSignal.addEventListener("ids", this.onOneSignalIdsReceived);
        OneSignal.configure();
      }
    }
  }

  componentWillUnmount() {
    OneSignal.removeEventListener("ids", this.onOneSignalIdsReceived);
  }

  onOneSignalIdsReceived = device => {
    const { userId } = device;
    store.dispatch(OneSignalActions.storeNotifId(userId));
  };

  render() {
    const { isRehydrated } = this.props;
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle="light-content" />
        {isRehydrated && <ReduxNavigation />}
      </View>
    );
  }
}

RootContainer.propTypes = {
  isRehydrated: bool
};

const mapStateToProps = createStructuredSelector({
  isRehydrated: isRehydrated()
});

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = dispatch => ({
  startup: () => dispatch(StartupActions.startup())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withOneSignalListener(RootContainer));
