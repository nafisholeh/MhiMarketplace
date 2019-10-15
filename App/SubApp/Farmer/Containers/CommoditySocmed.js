import React, { Component } from 'react';
import { View } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { string } from 'prop-types';

import PostFeedModal from './PostFeedModal';
import { NewsFeedItem } from 'CommonFarmer';

class CommoditySocmed extends Component {
  static navigationOptions = ({navigation}) => ({ header: null })

  render() {
    return (
      <View>
        <PostFeedModal />
        <NewsFeedItem
          userName="Adi Sucipto"
          content="Semoga aplikasi MHI Mendunia..."
          commentTotal={10}
        />
        <NewsFeedItem
          userName="Titik Sutiawati"
          content="Semua petani kaya, amiiin"
          likeTotal={2}
          commentTotal={1}
        />
        <NewsFeedItem
          userName="Totok"
          content="Ada yg tau apa itu MHI?"
          commentTotal={0}
        />
      </View>
    )
  };
}

const mapStateToProps = createStructuredSelector({
  
});

const mapDispatchToProps = dispatch => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(CommoditySocmed);
