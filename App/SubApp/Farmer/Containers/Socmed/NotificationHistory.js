import React, { Component } from 'react';
import { View, ScrollView, Text, Image } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';

import { NOTIFICATION_BY_USER } from 'GraphQL/Notification/Query';
import { getUserId } from 'Redux/SessionRedux';
import { QueryEffectPage } from 'Components';
import { NotificationItem } from 'CommonFarmer';
import { Fonts, Images } from 'Themes';
import { moderateScale } from 'Lib';

class NotificationHistory extends Component {
  static navigationOptions = ({navigation}) => ({ header: null })
  
  render() {
    const { userId } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Image
            source={Images.back}
            style={{
              width: moderateScale(20),
              height: moderateScale(20),
              marginLeft: moderateScale(15),
              marginRight: moderateScale(15)
            }}
          />
          <Text
            style={{
              marginTop: moderateScale(15),
              marginBottom: moderateScale(12),
              ...Fonts.PAGE_TITLE
            }}
          >
            Notifikasi
          </Text>
        </View>
        <Query
          query={NOTIFICATION_BY_USER}
          variables={{ user_id: userId }}
        >
          {({ loading, error, data, refetch }) => {
            const { userNotifications } = data || {};
            const { notification_history = [] } = userNotifications || {};
            if (Array.isArray(notification_history) && notification_history.length) {
              return (
                <ScrollView>
                  {notification_history.map((item) => {
                    const { context, content_preview, user_origin } = item || {};
                    const { ktp_name, ktp_photo_face } = user_origin;
                    return (
                      <NotificationItem
                        content={content_preview}
                        subjectName={ktp_name}
                        thumbnail={ktp_photo_face}
                        context={context}
                      />
                    )
                  })}
                </ScrollView>
              )
            }
            return (
              <QueryEffectPage
                buttonTitle="Coba lagi"
                isLoading={loading}
                isError={error}
                isEmpty={!notification_history.length}
                onRefetch={() => refetch()}
              />
            );
          }}
        </Query>
      </View>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  userId: getUserId(),
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationHistory);
