import { StackActions, NavigationActions } from 'react-navigation';

import { store } from 'Containers/App';
import ListActions from 'Redux/ListRedux';

export const openFeedDetail = data => {
    const { postId } = data || {};
    if (!postId) return;
    store.dispatch(ListActions.selectListItem(postId));
    store.dispatch(NavigationActions.navigate({
        routeName: "NewsFeedDetail"
    }));
};