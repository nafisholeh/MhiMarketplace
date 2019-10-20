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
import PostComments from './PostComments';
import NewsFeedDivider from './NewsFeedDivider';

class NewsFeedItem extends Component {
  submitCommentToPost = comment => {
    const { submitCommentToPost } = this.props;
    if (submitCommentToPost) {
      submitCommentToPost(comment);
    }
  };

  render() {
    const {
      feedId,
      userName,
      content,
      onLike,
      onComment,
      showBackButton,
      onBackPressed,
      showActionBorder,
      dateCreated,
      comments
    } = this.props;
    return (
      <View>
        <PostBody
          {...this.props}
          showActionBorder
        />
        <PostComments
          comments={comments}
          onSubmitComment={this.submitCommentToPost}
          showCommentInput
        />
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
