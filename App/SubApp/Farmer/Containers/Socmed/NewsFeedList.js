import React, { Component, Fragment } from 'react';
import { FlatList, View } from 'react-native';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

import ListActions from 'Redux/ListRedux';
import Config from 'Config/AppConfig';
import { FETCH_FARMER_POSTS } from 'GraphQL/Farmer/Query';
import { QueryEffectPage } from 'Components';
import { NewsFeedItem, NewsFeedDivider } from './Components';

class NewsFeedList extends Component {
  
  onOpenComments = feedId => {
    const { selectListItem, navigation } = this.props;
    selectListItem(feedId);
    navigation.navigate('NewsFeedComments');
  };

  renderNewsFeedItem = ({ item, index }) => {
    const { _id, content, author, date_posted } = item || {};
    const { ktp_name } = author || {};
    return (
      <Fragment>
        <NewsFeedItem
          feedId={_id}
          userName={ktp_name}
          content={content}
          dateCreated={date_posted}
          onPressWrapper={this.onOpenComments}
        />
        <NewsFeedDivider/>
      </Fragment>
    );
  };

  render() {
    return (
      <Query query={FETCH_FARMER_POSTS}>
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
