import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { Avatar } from "CommonFarmer";
import { Fonts, Metrics } from "Themes";
import { getUserShortBio } from "Redux/SessionRedux";

class UserInfo extends Component {
  render() {
    const { shortBio } = this.props;
    const { name, photo } = shortBio || {};
    return (
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: Metrics.mediumMargin,
          marginTop: Metrics.doubleBaseMargin,
          marginBottom: Metrics.mediumMargin
        }}
      >
        <Avatar source={photo} style={{ marginRight: Metrics.mediumMargin }} />
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
            {name || "..."}
          </Text>
          <Text style={{ ...Fonts.TITLE_SMALL }}>Komoditas user</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  shortBio: getUserShortBio()
});

export default connect(mapStateToProps, null)(UserInfo);
