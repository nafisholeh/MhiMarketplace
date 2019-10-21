import React, { Component, Fragment } from 'react';
import { FlatList, View } from 'react-native';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import moment from 'moment';

import ApolloClientProvider from 'Services/ApolloClientProvider';
import ListActions from 'Redux/ListRedux';
import Config from 'Config/AppConfig';
import { FETCH_FARMER_POSTS } from 'GraphQL/Farmer/Query';
import { COMMENT_TO_POST } from 'GraphQL/Farmer/Mutation';
import { QueryEffectPage } from 'Components';
import { NewsFeedItem } from './Components';
import { getUTCDate } from 'Lib';

class NewsFeedList extends Component {
  
  openFeedDetail = feedId => {
    const { selectListItem, navigation } = this.props;
    selectListItem(feedId);
    navigation.navigate('NewsFeedDetail');
  };
  
  submitCommentToPost = (feedId, comment) => {
    ApolloClientProvider.client.mutate({
      mutation: COMMENT_TO_POST,
      variables: {
        data: {
          content: comment,
          author: "5d8fc3f8b8ea7474d8b0c94b",
          post: feedId,
          date_commented: getUTCDate(),
        }
      }
    })
    .then(res => {
      console.tron.log('submitCommentToPost/res', res)
    })
    .catch(err => {
      console.tron.log('submitCommentToPost/err', err)
    });
  };

  renderNewsFeedItem = ({ item, index }) => {
    const { _id, content, author, date_posted, comments, likes_total } = item || {};
    const { ktp_name } = author || {};
    return (
      <NewsFeedItem
        feedId={_id}
        userName={ktp_name}
        content={content}
        dateCreated={date_posted}
        comments={comments}
        likeTotal={likes_total}
        onPressWrapper={this.openFeedDetail}
        onComment={() => this.openFeedDetail(_id)}
        submitCommentToPost={comment => this.submitCommentToPost(_id, comment)}
      />
    );
  };

  render() {
    return (
      <Query
        query={FETCH_FARMER_POSTS}
        fetchPolicy="network-only"
      >
        {({ loading, error, data, refetch }) => {
          const { farmerPosts: dataList = [] } = data || {};
          if (Array.isArray(dataList) && dataList.length) {
            return (
              <FlatList
                keyExtractor={(item, id) => item._id.toString()}
                data={dataList} 
                renderItem={this.renderNewsFeedItem}
              />
            );
          }
          return (
            <QueryEffectPage
              title="Belum ada postingan"
              subtitle="Posting yuk..."
              buttonTitle="Coba lagi"
              isLoading={loading}
              isError={error}
              isEmpty={!dataList.length}
              iconEmpty={Config.pageState.ERROR}
              onRefetch={() => refetch()}
            />
          );
        }}
      </Query>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  selectListItem: selectedId => dispatch(ListActions.selectListItem(selectedId)),
});

export default connect(null, mapDispatchToProps)(withNavigation(NewsFeedList));
