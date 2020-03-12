import React, { Component } from "react";
import { ScrollView, View } from "react-native";

import { KeyboardFriendlyView, HeaderTitleSecondary } from "Components";
import { METRICS } from "Themes";
import SignupIndicator from "./SignupIndicator";

export default class SignupWrapper extends Component {
  render() {
    const { children } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <HeaderTitleSecondary title="Kunci nya akun" />
        <SignupIndicator />
        <ScrollView>
          <KeyboardFriendlyView
            style={{
              paddingVertical: METRICS.HUGE,
              paddingHorizontal: METRICS.HUGE
            }}
          >
            {children}
          </KeyboardFriendlyView>
        </ScrollView>
      </View>
    );
  }
}
