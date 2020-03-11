import React, { Component } from "react";
import { TouchableOpacity, Image, View, Text } from "react-native";
import { withNavigation } from "react-navigation";
import { Query } from "react-apollo";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { Images, METRICS, Colors } from "Themes";
import { NOTIFICATION_UNSEEN_TOTAL } from "GraphQL/Notification/Query";
import { getUserId } from "Redux/SessionRedux";
import { moderateScale } from "Lib";

class NotificationBar extends Component {
  openNotificationPage = () => {
    const { navigation } = this.props;
    navigation.navigate("NotificationHistory");
  };

  render() {
    const { style, userId } = this.props;
    return (
      <Query query={NOTIFICATION_UNSEEN_TOTAL} variables={{ user_id: userId }}>
        {({ loading, data }) => {
          const { userNotificationUnseenTotal: unseenTotal = 0 } = data || {};
          return (
            <View style={{ ...style, ...{ position: "relative" } }}>
              <TouchableOpacity onPress={this.openNotificationPage}>
                <Image
                  source={Images.notification}
                  style={{
                    width: METRICS.ICON_MEDIUM,
                    height: METRICS.ICON_MEDIUM
                  }}
                />
              </TouchableOpacity>
              {unseenTotal ? (
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: moderateScale(12),
                    height: moderateScale(12),
                    borderRadius: moderateScale(6),
                    backgroundColor: Colors.veggie_dark
                  }}
                />
              ) : null}
            </View>
          );
        }}
      </Query>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  userId: getUserId()
});

export default connect(mapStateToProps, null)(withNavigation(NotificationBar));
