import React, { Component } from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import { withNavigation } from 'react-navigation';

import ApolloClientProvider from 'Services/ApolloClientProvider';
import { NOTIFICATION_BY_USER } from 'GraphQL/Notification/Query';
import {
  READING_NOTIFICATION,
  cacheReadAllNotification,
  cacheReadOneNotification
} from 'GraphQL/Notification/Mutation';
import ListActions from 'Redux/ListRedux';
import { getUserId } from 'Redux/SessionRedux';
import { QueryEffectPage } from 'Components';
import { NotificationItem } from 'CommonFarmer';
import { Fonts, Images } from 'Themes';
import { InAppNotification, moderateScale } from 'Lib';

class NotificationHistory extends Component {
  static navigationOptions = ({navigation}) => ({ header: null })

  readingUnseenNotification = () => {
    const { userId } = this.props;
    ApolloClientProvider.client.mutate({
      mutation: READING_NOTIFICATION,
      variables: { user_id: userId },
    })
    .then(res => {})
    .catch(err => {
      InAppNotification.error();
    })
  };

  componentWillUnmount() {
    const { userId } = this.props;
    cacheReadAllNotification(userId);
  }

  onPressNotification = (notifId, postId) => {
    const { userId, selectListItem, navigation } = this.props;
    cacheReadOneNotification(userId, notifId);
    selectListItem(postId);
    navigation.navigate('NewsFeedDetail');
  }
  
  render() {
    const { userId, navigation } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
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
          </TouchableOpacity>
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
          onCompleted={() => {
            setTimeout(() => {this.readingUnseenNotification()}, 1000)
          }}
        >
          {({ loading, error, data, refetch }) => {
            const { userNotifications } = data || {};
            const { notification_history = [] } = userNotifications || {};
            if (Array.isArray(notification_history) && notification_history.length) {
              return (
                <ScrollView>
                  {notification_history.map((item) => {
                    const { _id, post, context, content_preview, user_origin, has_seen } = item || {};
                    const { ktp_name, ktp_photo_face } = user_origin;
                    return (
                      <NotificationItem
                        notifId={_id}
                        postId={post}
                        content={content_preview}
                        subjectName={ktp_name}
                        thumbnail={ktp_photo_face}
                        context={context}
                        hasSeen={has_seen}
                        onPress={this.onPressNotification}
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

const mapDispatchToProps = dispatch => ({
  selectListItem: selectedId => dispatch(ListActions.selectListItem(selectedId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(NotificationHistory));
