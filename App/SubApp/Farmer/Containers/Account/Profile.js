import React, { Component } from "react";
import { ScrollView, View } from "react-native";
import { connect } from "react-redux";

import { withNoHeader } from "Hoc";
import { UserInfo, NavigationMenu } from "./Component";
import { ButtonPrimary } from "Components";
import { Metrics } from "Themes";

class Profile extends Component {
  render() {
    return (
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <UserInfo />
        <NavigationMenu title="Ubah biodata" />
        <NavigationMenu title="Ubah lahan" />
        <NavigationMenu title="Simpanan" />
        <View
          style={{
            position: "absolute",
            bottom: Metrics.baseMargin,
            left: Metrics.baseMargin,
            right: Metrics.baseMargin
          }}
        >
          <ButtonPrimary onPress={() => {}} title="Logout" />
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, null)(withNoHeader(Profile));
