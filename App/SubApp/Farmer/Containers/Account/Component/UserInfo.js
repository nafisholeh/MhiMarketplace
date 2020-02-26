import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";

import { Avatar } from "CommonFarmer";
import { Fonts, Metrics } from "Themes";

class UserInfo extends Component {
  render() {
    const { userPhoto } = this.props;
    return (
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: Metrics.mediumMargin,
          marginTop: Metrics.doubleBaseMargin,
          marginBottom: Metrics.mediumMargin
        }}
      >
        <Avatar
          source={userPhoto}
          style={{ marginRight: Metrics.mediumMargin }}
        />
        <View
          style={{
            justifyContent: "center"
          }}
        >
          <Text
            style={{
              ...Fonts.TITLE_NORMAL,
              ...{ marginBottom: Metrics.smallMargin }
            }}
          >
            Nama user
          </Text>
          <Text style={{ ...Fonts.TITLE_SMALL }}>Komoditas user</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, null)(UserInfo);
