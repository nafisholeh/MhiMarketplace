import React, { Component, Fragment } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { string } from 'prop-types';
import moment from 'moment';
import { Mutation } from 'react-apollo';

import { Fonts, Colors, Images } from 'Themes';
import { moderateScale, getIntervalTimeToday, unixToDate } from 'Lib';
import { Avatar } from 'CommonFarmer';
import { LIKE, DISLIKE, cacheLike, cacheDislike } from 'GraphQL/Farmer/Mutation';

class PostBody extends Component {
  state = {
    statistic: '',
    isLiked: false,
  };
  
  componentDidMount() {
    this.drawStatistic();
    this.handleCreatedDate();
    this.handleLikeStatus();
  }
  
  componentDidUpdate(prevProps) {
    const { likeTotal, commentTotal, shareTotal, dateCreated, likes } = this.props;
    if (
      prevProps.likeTotal !== likeTotal
      ||prevProps.commentTotal !== commentTotal
      || prevProps.shareTotal !== shareTotal
    ) {
      this.drawStatistic();
    }
    if (prevProps.dateCreated !== dateCreated) {
      this.handleCreatedDate();
    }
    if (prevProps.likes !== likes) {
      this.handleLikeStatus();
    }
  }
  
  handleLikeStatus = () => {
    const { loggedInUserId, likes = [] } = this.props;
    if (Array.isArray(likes)) {
      this.setState({ 
        isLiked: likes.findIndex(({ _id }) => _id === loggedInUserId) >= 0,
      });
    }
  }
  
  handleCreatedDate = () => {
    const { dateCreated } = this.props;
    this.setState({ 
      dateCreated: unixToDate(dateCreated)
    });
  };
  
  drawStatistic = () => {
    const { likeTotal, commentTotal, shareTotal } = this.props;
    this.setState({
      statistic:
        `${likeTotal ? `${likeTotal} suka ` : ``}`
        + `${commentTotal ? `${commentTotal} balasan ` : ``}`
        + `${shareTotal ? `${shareTotal} share` : ``}`
    });
  };

  onPressWrapper = () => {
    const { onPressWrapper, feedId } = this.props;
    if (onPressWrapper) {
      onPressWrapper(feedId);
    }
  };
  
  renderButton = (title, icon, onPress, noTintColor) => (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: moderateScale(5),
        marginBottom: moderateScale(10)
      }}
    >
      <Image
        source={Images[icon]}
        style={
          Object.assign(
            {},
            {
              width: moderateScale(20),
              height: moderateScale(20),
              marginRight: moderateScale(5),
            },
            noTintColor ? {} : { tintColor: Colors.icon }
          )
        }
      />
      <Text
        style={{
          ...Fonts.TITLE_NORMAL,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );

  render() {
    const {
      feedId,
      loggedInUserId,
      userName,
      content,
      onLike,
      likes,
      onComment,
      showBackButton,
      onBackPressed,
      showActionBorder
    } = this.props;
    const { statistic, dateCreated, isLiked } = this.state;
    return (
      <TouchableOpacity
        onPress={this.onPressWrapper}
        disabled={showBackButton}
        style={{
          paddingHorizontal: moderateScale(10),
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: moderateScale(15),
          }}
        >
          {showBackButton
            ? (
              <TouchableOpacity
                onPress={onBackPressed}
              >
                <Image
                  source={Images.back}
                  style={{
                    width: moderateScale(20),
                    height: moderateScale(20),
                    marginRight: moderateScale(18),
                  }}
                />
              </TouchableOpacity>
            )
            : null
          }
          <Avatar
            size="small"
            style={{ marginRight: moderateScale(10) }}
          />
          <View
            style={{
              justifyContent: 'space-between'
            }}
          >
            <Text
              style={{
                ...Fonts.TITLE_NORMAL,
              }}
            >
              {userName}
            </Text>
            {dateCreated
              ? (
                <Text
                  style={{
                    ...Fonts.TITLE_SMALL,
                  }}
                >
                  {getIntervalTimeToday(dateCreated)}
                </Text>
              )
              : null
            }
          </View>
        </View>
        <View
          style={{
            marginBottom: moderateScale(10),
          }}
        >
          <Text
            style={{
              ...Fonts.TITLE_NORMAL,
              color: Colors.text,
              lineHeight: moderateScale(18),
              letterSpacing: 0.3
            }}
          >
            {content}
          </Text>
        </View>
        {statistic ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginBottom: moderateScale(10),
              }}
            >
              <Text
                style={{
                  ...Fonts.TITLE_SMALL
                }}
              >
                {statistic}
              </Text>
            </View>
          )
          : null
        }
        <View
          style={{
            flexDirection: 'row',
            borderBottomWidth: showActionBorder ? 1 : 0,
            borderBottomColor: Colors.border,
          }}
        >
          <Mutation
            mutation={isLiked ? DISLIKE : LIKE}
            ignoreResults={false}
            update={(cache, data) =>
              isLiked
                ? cacheDislike(cache, feedId, loggedInUserId)
                : cacheLike(cache, feedId, loggedInUserId)
            }
            errorPolicy='all'>
            { (mutate, {loading, error, data}) => {
              const onLikeMutate = () => mutate({
                variables: {
                  elementId: feedId,
                  userId: loggedInUserId,
                  type: "POST"
                }
              });
              return (this.renderButton('suka', isLiked ? 'liked' : 'like', onLikeMutate, isLiked));
            }}
          </Mutation>
          {this.renderButton('balas', 'comment', onComment)}
        </View>
      </TouchableOpacity>
    )
  };
}

export default PostBody;
