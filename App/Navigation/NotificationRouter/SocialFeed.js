import { NavigationActions } from "react-navigation";

import { store } from "Containers/App";
import ListActions from "Redux/ListRedux";
import NotificationActions from "Redux/NotificationRedux";

export const openFeedDetail = data => {
  const { postId, commentId, subCommentId } = data || {};
  if (!postId) return;
  const highlightId = subCommentId || commentId;
  store.dispatch(ListActions.selectListItem(postId));
  store.dispatch(
    NotificationActions.selectNotification({ postId, highlightId })
  );
  store.dispatch(
    NavigationActions.navigate({
      routeName: "NewsFeedDetail"
    })
  );
};
