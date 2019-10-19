import React, { Component } from 'react';
import { View, FlatList, ScrollView } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import { Query } from 'react-apollo';

import Config from 'Config/AppConfig';
import { QueryEffectPage } from 'Components';
import PostFeedModal from './PostFeedModal';
import { NewsFeedItem } from 'CommonFarmer';
import { FETCH_FARMER_POSTS } from 'GraphQL/Farmer/Query';

class CommoditySocmed extends Component {
  static navigationOptions = ({navigation}) => ({ header: null })
  
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
      <ScrollView>
        <PostFeedModal />
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
      </ScrollView>
    )
  };
}

const mapStateToProps = createStructuredSelector({
  
});

const mapDispatchToProps = dispatch => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(CommoditySocmed);
