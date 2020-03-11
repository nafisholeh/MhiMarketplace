import React, { PureComponent } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { Avatar } from "CommonFarmer";
import { Fonts, METRICS } from "Themes";
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
          marginHorizontal: METRICS.MEDIUM,
          marginTop: METRICS.LARGE,
          marginBottom: METRICS.MEDIUM
        }}
      >
        <Avatar source={photo} style={{ marginRight: METRICS.MEDIUM }} />
        <View
          style={{
            justifyContent: "center"
          }}
        >
          <Text
            style={{
              ...Fonts.BODY_NORMAL,
              ...{ marginBottom: METRICS.TINY }
            }}
          >
            {name || "..."}
          </Text>
          <Text style={{ ...Fonts.BODY_SMALL }}>{commodities}</Text>
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
