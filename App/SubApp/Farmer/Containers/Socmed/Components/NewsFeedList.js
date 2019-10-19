import React, { Component, Fragment } from 'react';
import { FlatList, View } from 'react-native';
import { Query } from 'react-apollo';

import Config from 'Config/AppConfig';
import { FETCH_FARMER_POSTS } from 'GraphQL/Farmer/Query';
import { QueryEffectPage } from 'Components';
import NewsFeedItem from './NewsFeedItem';

class NewsFeedList extends Component {

  renderNewsFeedItem = ({ item, index }) => {
    const { content, author, date_posted } = item || {};
    const { ktp_name } = author || {};
    return (
      <NewsFeedItem
        userName={ktp_name}
        content={content}
        dateCreated={date_posted}
      />
    );
  };

  render() {
    return (
      <View>
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
      </View>
    );
  }
}

export default NewsFeedList;
