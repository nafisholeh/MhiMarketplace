import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default class KeyboardFriendlyView extends Component {
  constructor(props) {
    super(props);
    this._scroll = React.createRef();
  }
  render() {
    return (
      <KeyboardAwareScrollView
        ref={(ref) => (this._scroll = ref)}
        style={styles(this.props).container}
        showsVerticalScrollIndicator={false}
        extraHeight={150}
        keyboardDismissMode="interactive"
        enableOnAndroid={true}
        {...this.props}
      >
        {this.props.children}
      </KeyboardAwareScrollView>
    );
  }
}

const styles = (props) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: props.backgroundColor,
    },
  });
