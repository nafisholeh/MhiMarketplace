import gql from "graphql-tag";

import { store } from "Containers/App";
import { NOTIFICATION_BY_USER, NOTIFICATION_UNSEEN_TOTAL } from "./Query";
import { extractGraphQLResponse } from "Lib";
import ApolloClientProvider from "Services/ApolloClientProvider";

export const READING_NOTIFICATION = gql`
  mutation readingNotifications($user_id: String!) {
    readingNotifications(user_id: $user_id) {
      message
    }
  }
`;

export const cacheReadAllNotification = userId => {
  try {
    const rawNotifications = ApolloClientProvider.client.cache.readQuery({
      query: NOTIFICATION_BY_USER,
      variables: { user_id: userId }
    });
    const notifications = extractGraphQLResponse(rawNotifications);
    const { notification_history: notificationHistory } = notifications || {};
    if (!Array.isArray(notificationHistory) || !notificationHistory.length)
      return;
    const newNotificationHistory = notificationHistory.map(item => {
      const { has_seen } = item || {};
      if (!has_seen) {
        return Object.assign({}, item, {
          has_seen: true,
          __typename: "FarmerNotification"
        });
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
  } catch (err) {}
};

export const cacheReadOneNotification = (userId, itemId) => {
  try {
    const rawNotifications = ApolloClientProvider.client.cache.readQuery({
      query: NOTIFICATION_BY_USER,
      variables: { user_id: userId }
    });
    const notifications = extractGraphQLResponse(rawNotifications);
    const { notification_history: notificationHistory } = notifications || {};
    if (!Array.isArray(notificationHistory) || !notificationHistory.length)
      return;
    const newNotificationHistory = notificationHistory.map(item => {
      const { _id } = item || {};
      if (_id === itemId) {
        return Object.assign({}, item, {
          has_seen: true,
          __typename: "FarmerNotification"
        });
      }
      return Object.assign({}, item, { __typename: "FarmerNotification" });
    });
    ApolloClientProvider.client.writeQuery({
      query: NOTIFICATION_BY_USER,
      variables: { user_id: userId },
      data: {
        userNotifications: {
          notification_history: newNotificationHistory,
          __typename: "UserFarmer"
        }
      }
    });
  } catch (err) {}
};

export const cacheResetUnseenTotal = (cache, userId) => {
  try {
    cache.writeQuery({
      query: NOTIFICATION_UNSEEN_TOTAL,
      variables: { user_id: userId },
      data: {
        userNotificationUnseenTotal: 0
      }
    });
  } catch (err) {}
};

export const cacheUpdateUnseenTotal = newTotal => {
  try {
    const {
      session: {
        user: { _id: user_id }
      }
    } = store.getState();
    ApolloClientProvider.client.writeQuery({
      query: NOTIFICATION_UNSEEN_TOTAL,
      variables: { user_id },
      data: {
        userNotificationUnseenTotal: newTotal
      }
    });
  } catch (err) {}
};
