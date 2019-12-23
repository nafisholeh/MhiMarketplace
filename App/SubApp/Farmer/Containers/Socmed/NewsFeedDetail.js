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
import { getUserId } from 'Redux/SessionRedux';
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
    commentId: null,
    commentAuthorId: null,
    isReplyComment: false,
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
  
  replyComment = (feedId, authorId, name) => {
    this.setState({
      commentId: feedId,
      commentAuthorId: authorId,
      isReplyComment: true,
      parentUsername: name
    });
  };
  
  cancelReplyComment = () => {
    this.setState({
      commentId: null,
      commentAuthorId: null,
      isReplyComment: false,
      parentUsername: ''
    });
  };
  
  submitCommentToPost = (feedId, feedAuthorId, comment) => {
    const { isReplyComment, commentId, commentAuthorId } = this.state;
    const { loggedInUserId } = this.props;
    const data = Object.assign(
      {},
      {
        content: comment,
        date_commented: getUTCDate(),
        reply_author_id: loggedInUserId,
      },
      isReplyComment
        ? {
          post_id: feedId,
          comment_id: commentId,
          comment_author_id: commentAuthorId,
        }
        : {
          post: feedId,
          post_author_id: feedAuthorId,
        }
    );
    ApolloClientProvider.client.mutate({
      mutation: isReplyComment ? REPLY_TO_COMMENT : COMMENT_TO_POST,
      variables: { data },
      update: (cache, data) => 
        isReplyComment
          ? cacheSubCommentReply(cache, data, feedId, commentId, comment)
          : cacheCommentReply(cache, data, feedId, comment)
    })
    .then(res => {
      console.tron.log('submitCommentToPost/res', res)
    })
    .catch(err => {
      console.tron.log('submitCommentToPost/err', err)
    })
    .finally(() => {
      if (isReplyComment) {
        this.cancelReplyComment();
      }
    })
  };

  render() {
    const { navigation, feedId, loggedInUserId } = this.props;
    const { isReplyComment, parentUsername } = this.state;
    if (!feedId) {
      return <View></View>
    }
    return (
      <View style={{flex: 1}}>
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
                photo,
                author,
                date_posted,
                comments,
                likes,
                likes_total
              } = dataList || {};
              const { _id: feedAuthorId, ktp_name } = author || {};
              return (
                <Fragment>
                  <ScrollView
                    contentContainerStyle={{
                      paddingBottom: moderateScale(65)
                    }}
                  >
                    <NewsFeedContent
                      feedId={feedId}
                      loggedInUserId={loggedInUserId}
                      userName={ktp_name}
                      content={content}
                      photo={photo}
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
                      onSubmitComment={comment =>
                        this.submitCommentToPost(feedId, feedAuthorId, comment)
                      }
                      showInfo={isReplyComment}
                      info={isReplyComment ? `Balas ke ${parentUsername}` : ''}
                      onClosingInfo={this.cancelReplyComment}
                    />
                  </View>
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
      </View>
    )
  };
}

const mapStateToProps = createStructuredSelector({
  feedId: getSelectedListId(),
  loggedInUserId: getUserId(),
});

const mapDispatchToProps = dispatch => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(NewsFeedDetail));
