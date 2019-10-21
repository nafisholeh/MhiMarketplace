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
    const { comments = [] } = this.props;
    return (
      <View>
        <PostBody
          {...this.props}
          userId="5d93631029c05f7a60f247a5"
          showActionBorder
        />
        {Array.isArray(comments) && comments.length
          ? (
            <PostComments
              comments={comments}
              onSubmitComment={this.submitCommentToPost}
              showCommentInput
              onLikeParent={() => {}}
              onCommentParent={() => {}}
              onLikeChild={() => {}}
              onCommentChild={() => {}}
            />
          )
          : null
        }
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
