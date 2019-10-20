import React, { Component, Fragment } from 'react';
import { View, ScrollView } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import { withNavigation } from 'react-navigation';
import { Query } from 'react-apollo';

import ApolloClientProvider from 'Services/ApolloClientProvider';
import {
  CommentItem,
  PostBody,
  PostComments,
  CommentInput
} from './Components';
import { Colors } from 'Themes';
import { moderateScale, getUTCDate } from 'Lib';
import { getSelectedListId } from 'Redux/ListRedux';
import { FETCH_FARMER_POST } from 'GraphQL/Farmer/Query';
import { COMMENT_TO_POST } from 'GraphQL/Farmer/Mutation';
import { QueryEffectPage } from 'Components';
import Config from 'Config/AppConfig';

class NewsFeedDetail extends Component {
  static navigationOptions = ({navigation}) => ({ header: null })
  
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
  
  submitCommentToPost = (feedId, comment) => {
    ApolloClientProvider.client.mutate({
      mutation: COMMENT_TO_POST,
      variables: {
        data: {
          content: comment,
          author: "5d8fc3f8b8ea7474d8b0c94b",
          post: feedId,
          date_commented: getUTCDate(),
        }
      }
    })
    .then(res => {
      console.tron.log('submitCommentToPost/res', res)
    })
    .catch(err => {
      console.tron.log('submitCommentToPost/err', err)
    });
  };

  render() {
    const { navigation, feedId } = this.props;
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
            fetchPolicy="network-only"
          >
            {({ loading, error, data, refetch }) => {
              const { farmerPost: dataList = [] } = data || {};
              if (dataList) {
                const { _id: feedId, content, author, date_posted, comments } = dataList || {};
                const { ktp_name } = author || {};
                return (
                  <Fragment>
                    <PostBody
                      feedId={feedId}
                      userName={ktp_name}
                      content={content}
                      dateCreated={date_posted}
                      showBackButton
                      showActionBorder
                      onBackPressed={() => navigation.goBack()}
                    />
                    <PostComments
                      comments={comments}
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
            paddingVertical: moderateScale(5),
          }}
        >
          <CommentInput
            style={{
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
            }}
            onSubmitComment={comment => this.submitCommentToPost(feedId, comment)}
          />
        </View>
      </View>
    )
  };
}

const mapStateToProps = createStructuredSelector({
  feedId: getSelectedListId(),
});

const mapDispatchToProps = dispatch => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(NewsFeedDetail));
