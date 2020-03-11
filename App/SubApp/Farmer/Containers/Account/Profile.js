import React, { Component } from "react";
import { ScrollView, View } from "react-native";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import Config from "Config/AppConfig";
import { withNoHeader, withSignout } from "Hoc";
import { StatePage } from "Components";
import { UserInfo, NavigationMenu } from "./Component";
import { ButtonPrimary } from "Components";
import { METRICS } from "Themes";
import { isFarmer, getUser } from "Redux/SessionRedux";

class Profile extends Component {
  signin = () => {
    const { navigation } = this.props;
    navigation.navigate("Signin");
  };

  render() {
    const { userData, isFarmer, onSignout, signoutLoading } = this.props;
    if (!userData || !isFarmer) {
      return (
        <StatePage
          title="Untuk kenyamanan Anda"
          subtitle="Silahkan daftar/login terlebih dahulu"
          buttonTitle="Login Yuk"
          icon={Config.pageState.NO_ACCOUNT}
          onPress={this.signin}
        />
      );
    }
    return (
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <UserInfo />
        <NavigationMenu title="Ubah biodata" />
        <NavigationMenu title="Ubah lahan" />
        <NavigationMenu title="Simpanan" />
        <View
          style={{
            position: "absolute",
            bottom: METRICS.SMALL,
            left: METRICS.SMALL,
            right: METRICS.SMALL
          }}
        >
          <ButtonPrimary
            loading={signoutLoading}
            onPress={() => onSignout()}
            title="Logout"
          />
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  userData: getUser(),
  isFarmer: isFarmer()
});

export default connect(
  mapStateToProps,
  null
)(withNoHeader(withSignout(Profile)));
