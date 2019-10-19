import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { string } from 'prop-types';

import { PostFeedModal, NewsFeedList } from './Components';

class CommoditySocmed extends Component {
  static navigationOptions = ({navigation}) => ({ header: null })

  render() {
    return (
      <ScrollView>
        <PostFeedModal />
        <NewsFeedList />
      </ScrollView>
    )
  };
}

const mapStateToProps = createStructuredSelector({
  
});

const mapDispatchToProps = dispatch => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(CommoditySocmed);
