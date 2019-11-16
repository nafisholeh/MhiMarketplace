import React, { Component, Fragment } from 'react';
import { FlatList, View } from 'react-native';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withNavigation } from 'react-navigation';
import moment from 'moment';

import ApolloClientProvider from 'Services/ApolloClientProvider';
import ListActions from 'Redux/ListRedux';
import { getMockUserId } from 'Redux/SessionRedux';
import Config from 'Config/AppConfig';
import { FETCH_FARMER_POSTS } from 'GraphQL/Farmer/Query';
import { COMMENT_TO_POST } from 'GraphQL/Farmer/Mutation';
import { QueryEffectPage } from 'Components';
import { NewsFeedContent, NewsFeedDivider } from './Components';
import NewsFeedComments from './NewsFeedComments';
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
    const { loggedInUserId } = this.props;
    const {
      _id,
      content,
      photo,
      author,
      date_posted,
      comments,
      likes_total,
      likes
    } = item || {};
    const { ktp_name } = author || {};
    const lastComment =
      Array.isArray(comments) && comments.length
        ? [comments[comments.length - 1]]
        : [];
    const otherCommentTotal =
      Array.isArray(comments) && comments.length
        ? comments.length - 1
        : 0;
    return (
      <View>
        <NewsFeedContent
          feedId={_id}
          loggedInUserId={loggedInUserId}
          userName={ktp_name}
          content={content}
          photo={photo}
          dateCreated={date_posted}
          comments={comments}
          likes={likes}
          likeTotal={likes_total}
          onPressWrapper={this.openFeedDetail}
          onComment={() => this.openFeedDetail(_id)}
          showActionBorder
        />
        <NewsFeedComments
          feedId={_id}
          comments={lastComment}
          onSubmitComment={comment => this.openFeedDetail(_id, comment)}
          showCommentInput
          onCommentInputClicked={() => this.openFeedDetail(_id)}
          onLikeParent={() => this.openFeedDetail(_id)}
          onLikeChild={() => this.openFeedDetail(_id)}
          hideLikeButton={true}
          onCommentParent={() => this.openFeedDetail(_id)}
          onCommentChild={() => this.openFeedDetail(_id)}
          onCommentContainerPressed={() => this.openFeedDetail(_id)}
          hideCommentButton={true}
          otherCommentTotal={otherCommentTotal}
          onViewOtherCommentPressed={() => this.openFeedDetail(_id)}
        />
        <NewsFeedDivider/>
      </View>
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

const mapStateToProps = createStructuredSelector({
  loggedInUserId: getMockUserId(),
});

const mapDispatchToProps = dispatch => ({
  selectListItem: selectedId => dispatch(ListActions.selectListItem(selectedId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(NewsFeedList));
