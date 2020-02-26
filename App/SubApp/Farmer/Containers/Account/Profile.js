import React, { Component } from "react";
import { ScrollView } from "react-native";
import { connect } from "react-redux";

import { withNoHeader } from "Hoc";
import { UserInfo, NavigationMenu } from "./Component";

class Profile extends Component {
  render() {
    return (
      <ScrollView>
        <UserInfo />
        <NavigationMenu title="Ubah biodata" />
        <NavigationMenu title="Ubah lahan" />
        <NavigationMenu title="Simpanan" />
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, null)(withNoHeader(Profile));
