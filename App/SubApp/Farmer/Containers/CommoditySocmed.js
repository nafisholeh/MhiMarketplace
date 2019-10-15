import React, { Component } from 'react';
import { View } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { string } from 'prop-types';

import PostFeedModal from './PostFeedModal';

class CommoditySocmed extends Component {
  static navigationOptions = ({navigation}) => ({ header: null })

  render() {
    return (
      <View>
        <PostFeedModal />
      </View>
    )
  };
}

const mapStateToProps = createStructuredSelector({
  
});

const mapDispatchToProps = dispatch => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(CommoditySocmed);
