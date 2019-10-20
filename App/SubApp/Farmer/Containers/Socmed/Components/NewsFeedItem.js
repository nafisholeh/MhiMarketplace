import React, { Component, Fragment } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import moment from 'moment';

import { Fonts, Colors, Images } from 'Themes';
import { moderateScale, getIntervalTimeToday } from 'Lib';
import { Avatar } from 'CommonFarmer';
import PostBody from './PostBody';
import NewsFeedDivider from './NewsFeedDivider';

class NewsFeedItem extends Component {
  render() {
    const {
      userName,
      content,
      onLike,
      onComment,
      showBackButton,
      onBackPressed,
      showActionBorder,
      dateCreated
    } = this.props;
    return (
      <View>
        <PostBody {...this.props} />
        <NewsFeedDivider/>
      </View>
    )
  };
}

const mapStateToProps = createStructuredSelector({
  
});

const mapDispatchToProps = dispatch => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeedItem);
