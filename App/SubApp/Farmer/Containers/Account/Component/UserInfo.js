import React, { PureComponent } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { Avatar } from "CommonFarmer";
import { Fonts, Metrics } from "Themes";
import { getUserShortBio, getUserCommoditiesName } from "Redux/SessionRedux";

class UserInfo extends PureComponent {
  render() {
    const { shortBio, userCommoditiesName } = this.props;
    const { name, photo } = shortBio || {};
    const commodities = Array.isArray(userCommoditiesName)
      ? userCommoditiesName.join(",")
      : null;
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
          <Text style={{ ...Fonts.TITLE_SMALL }}>{commodities}</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  shortBio: getUserShortBio(),
  userCommoditiesName: getUserCommoditiesName()
});

export default connect(mapStateToProps, null)(UserInfo);
