import React, { Component } from "react";
import { ScrollView } from "react-native";

import { KeyboardFriendlyView, HeaderTitleSecondary } from "Components";
import { METRICS } from "Themes";
import SignupIndicator from "./SignupIndicator";

export default class SignupWrapper extends Component {
  render() {
    const { children, title, currentPosition, styleWrapper } = this.props;
    return (
      <ScrollView {...this.props} keyboardShouldPersistTaps="handled">
        <HeaderTitleSecondary title={title} />
        <SignupIndicator currentPosition={currentPosition} />
        <KeyboardFriendlyView
          style={{
            paddingVertical: METRICS.HUGE,
            paddingHorizontal: METRICS.HUGE,
          }}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </KeyboardFriendlyView>
      </ScrollView>
    );
  }
}
