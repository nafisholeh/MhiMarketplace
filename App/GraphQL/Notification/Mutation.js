import gql from 'graphql-tag';

import { NOTIFICATION_BY_USER } from './Query';
import { extractGraphQLResponse } from 'Lib';
import ApolloClientProvider from 'Services/ApolloClientProvider';

export const READING_NOTIFICATION = gql`
  mutation readingNotifications($user_id:String!) {
    readingNotifications(user_id:$user_id) {
      message
    }
  }
`

export const cacheReadAllNotification = ( userId ) => {
  try {
    const rawNotifications = ApolloClientProvider.client.cache.readQuery({
      query: NOTIFICATION_BY_USER,
      variables: { user_id: userId }
    });
    const notifications = extractGraphQLResponse(rawNotifications);
    const { notification_history: notificationHistory } = notifications || {};
    if (!Array.isArray(notificationHistory) || !notificationHistory.length) return;
    const newNotificationHistory = notificationHistory.map(item => {
      const { has_seen } = item || {};
      if (!has_seen) {
        return Object.assign({}, item, { has_seen: true, __typename: "FarmerNotification" });
      }
      return Object.assign({}, item, { __typename: "FarmerNotification" });
    });
    ApolloClientProvider.client.cache.writeQuery({
      query: NOTIFICATION_BY_USER,
      variables: { user_id: userId },
      data: {
        userNotifications: {
          notification_history: newNotificationHistory,
          __typename: "UserFarmer"
        }
      }
    });
  } catch (err) {
    
  }
}