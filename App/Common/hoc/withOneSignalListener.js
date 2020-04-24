import React, { Component } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import OneSignal from "react-native-onesignal";

import { NOTIF_TYPE, ONE_SIGNAL_KEY } from "Config/AppConfig";
import { cacheNewOrder } from "Containers/CourierOrder/ReadyToProcess/Helper";
import { isRehydrated } from "Redux/StartupRedux";
import {
  cacheNewComment,
  cacheNewReplyComment,
} from "GraphQL/Farmer/CacheMutation";
import {
  cacheUpdateUnseenTotal,
  cacheAppendNotification,
} from "GraphQL/Notification/Mutation";
import { openFeedDetail } from "Navigation/NotificationRouter/SocialFeed";

export default function withOneSignalListener(WrappedComponent, Options = {}) {
  class OneSignalListener extends Component {
    componentDidUpdate(prevProps) {
      const { isRehydrated } = this.props;
      if (prevProps.isRehydrated !== isRehydrated && isRehydrated) {
        OneSignal.init(ONE_SIGNAL_KEY);
        OneSignal.inFocusDisplaying(2);
        OneSignal.addEventListener("received", this.onReceived);
        OneSignal.addEventListener("opened", this.onOpened);
      }
    }

    componentWillUnmount() {
      OneSignal.removeEventListener("received", this.onReceived);
      OneSignal.removeEventListener("opened", this.onOpened);
    }

    onReceived(notification) {
      const { payload = {} } = notification || {};
      const { additionalData = {} } = payload || {};
      const { __purpose } = additionalData || {};
      switch (__purpose) {
        case NOTIF_TYPE.NEW_ORDER:
          cacheNewOrder(additionalData);
          break;
        case NOTIF_TYPE.REPLY_POST:
          cacheNewComment(additionalData);
          cacheUpdateUnseenTotal(1);
          cacheAppendNotification(additionalData);
          break;
        case NOTIF_TYPE.REPLY_COMMENT:
          cacheNewReplyComment(additionalData);
          cacheUpdateUnseenTotal(1);
          cacheAppendNotification(additionalData);
          break;
        default:
          break;
      }
    }

    onOpened(openResult) {
      const { notification: { payload: { additionalData } = {} } = {} } =
        openResult || {};
      const { __purpose } = additionalData || {};
      switch (__purpose) {
        case NOTIF_TYPE.REPLY_POST:
        case NOTIF_TYPE.REPLY_COMMENT:
          openFeedDetail(additionalData);
          break;
        default:
          break;
      }
    }

    render() {
      return <WrappedComponent {...this.state} {...this.props} />;
    }
  }

  const mapStateToProps = createStructuredSelector({
    isRehydrated: isRehydrated(),
  });

  return connect(mapStateToProps, null)(OneSignalListener);
}
