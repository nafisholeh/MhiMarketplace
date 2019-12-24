import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withNavigation } from 'react-navigation';

import ListActions from 'Redux/ListRedux';
import { getUserId } from 'Redux/SessionRedux';
import Config from 'Config/AppConfig';
import { moderateScale } from 'Lib';
import { FETCH_FARMER_POSTS } from 'GraphQL/Farmer/Query';
import { QueryEffectPage } from 'Components';
import { NewsFeedContent, NewsFeedDivider } from './Components';
import NewsFeedComments from './NewsFeedComments';

class NewsFeedList extends Component {
  
  openFeedDetail = feedId => {
    const { selectListItem, navigation } = this.props;
    selectListItem(feedId);
    navigation.navigate('NewsFeedDetail');
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
      likes,
    } = item || {};
    const { ktp_name, ktp_photo_face_thumbnail } = author || {};
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
          avatar={ktp_photo_face_thumbnail}
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
            <View
              style={{
                marginTop: moderateScale(50),
              }}
            >
              <QueryEffectPage
                buttonTitle="Coba lagi"
                isLoading={loading}
                isError={error}
                isEmpty={!dataList.length}
                iconEmpty={Config.pageState.ERROR}
                onRefetch={() => refetch()}
              />
            </View>
          );
        }}
      </Query>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  loggedInUserId: getUserId(),
});

const mapDispatchToProps = dispatch => ({
  selectListItem: selectedId => dispatch(ListActions.selectListItem(selectedId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(NewsFeedList));
