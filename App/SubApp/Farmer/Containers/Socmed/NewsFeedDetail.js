import React, { Component, Fragment } from 'react';
import { View, ScrollView } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import { withNavigation } from 'react-navigation';
import { Query, Mutation } from 'react-apollo';

import ApolloClientProvider from 'Services/ApolloClientProvider';
import {
  NewsFeedContent,
  CommentItem,
  CommentInput,
} from './Components';
import NewsFeedComments from './NewsFeedComments';
import { Colors } from 'Themes';
import { moderateScale, getUTCDate } from 'Lib';
import { getSelectedListId } from 'Redux/ListRedux';
import { getMockUserId } from 'Redux/SessionRedux';
import { FETCH_FARMER_POST } from 'GraphQL/Farmer/Query';
import {
  COMMENT_TO_POST,
  REPLY_TO_COMMENT,
  LIKE,
  DISLIKE,
  cacheCommentReply,
  cacheSubCommentReply,
} from 'GraphQL/Farmer/Mutation';
import { QueryEffectPage } from 'Components';
import Config from 'Config/AppConfig';

class NewsFeedDetail extends Component {
  static navigationOptions = ({navigation}) => ({ header: null })
  
  state = {
    parentId: null,
    isReplyParent: false,
    parentUsername: '',
  };
  
  componentDidMount() {
    this.handleDataFetch();
  }
  
  componentDidUpdate(prevProps) {
    const { feedId } = this.props;
    if (prevProps.feedId !== feedId) {
      this.handleDataFetch();
    }
  }
  
  handleDataFetch = () => {
    const { feedId } = this.props;
    
  };
  
  replyComment = (feedId, name) => {
    this.setState({
      parentId: feedId,
      isReplyParent: true,
      parentUsername: name
    });
  };
  
  cancelReplyComment = () => {
    this.setState({
      parentId: null,
      isReplyParent: false,
      parentUsername: ''
    });
  };
  
  submitCommentToPost = (feedId, comment) => {
    const { isReplyParent, parentId } = this.state;
    const data = Object.assign(
      {},
      {
        content: comment,
        author: "5d8fc3f8b8ea7474d8b0c94b",
        date_commented: getUTCDate(),
      },
      isReplyParent ? { comment: parentId } : { post: feedId }
    );
    ApolloClientProvider.client.mutate({
      mutation: isReplyParent ? REPLY_TO_COMMENT : COMMENT_TO_POST,
      variables: { data },
      update: (cache, data) => 
        isReplyParent
          ? cacheSubCommentReply(cache, data, feedId, parentId, comment)
          : cacheCommentReply(cache, data, feedId, comment)
    })
    .then(res => {
      console.tron.log('submitCommentToPost/res', res)
    })
    .catch(err => {
      console.tron.log('submitCommentToPost/err', err)
    })
    .finally(() => {
      if (isReplyParent) {
        this.cancelReplyComment();
      }
    })
  };

  render() {
    const { navigation, feedId, loggedInUserId } = this.props;
    const { isReplyParent, parentUsername } = this.state;
    if (!feedId) {
      return <View></View>
    }
    return (
      <View style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{
            paddingBottom: moderateScale(65)
          }}
        >
          <Query
            query={FETCH_FARMER_POST}
            variables={{ _id: feedId }}
          >
            {({ loading, error, data, refetch }) => {
              const { farmerPost: dataList = [] } = data || {};
              if (dataList) {
                const {
                  _id: feedId,
                  content,
                  author,
                  date_posted,
                  comments,
                  likes,
                  likes_total
                } = dataList || {};
                const { ktp_name } = author || {};
                return (
                  <Fragment>
                    <NewsFeedContent
                      feedId={feedId}
                      loggedInUserId={loggedInUserId}
                      userName={ktp_name}
                      content={content}
                      dateCreated={date_posted}
                      showBackButton
                      showActionBorder
                      likes={likes}
                      likeTotal={likes_total}
                      onBackPressed={() => navigation.goBack()}
                    />
                    <NewsFeedComments
                      feedId={feedId}
                      comments={comments}
                      onCommentParent={this.replyComment}
                      onCommentChild={this.replyComment}
                    />
                  </Fragment>
                );
              }
              return (
                <QueryEffectPage
                  title="Terjadi masalah"
                  subtitle="Silahkan coba lagi"
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
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: Colors.white,
            paddingHorizontal: moderateScale(10),
            paddingTop: moderateScale(5),
            paddingBottom: moderateScale(10),
          }}
        >
          <CommentInput
            style={{
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
            }}
            onSubmitComment={comment => this.submitCommentToPost(feedId, comment)}
            showInfo={isReplyParent}
            info={isReplyParent ? `Balas ke ${parentUsername}` : ''}
            onClosingInfo={this.cancelReplyComment}
          />
        </View>
      </View>
    )
  };
}

const mapStateToProps = createStructuredSelector({
  feedId: getSelectedListId(),
  loggedInUserId: getMockUserId(),
});

const mapDispatchToProps = dispatch => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(NewsFeedDetail));
