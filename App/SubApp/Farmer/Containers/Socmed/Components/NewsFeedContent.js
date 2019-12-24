import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import FBCollage from 'react-native-fb-collage';

import AppConfig from 'Config/AppConfig';
import { Fonts, Colors, Images } from 'Themes';
import { moderateScale, getIntervalTimeToday, unixToDate } from 'Lib';
import { Avatar } from 'CommonFarmer';
import NewsFeedAction from './NewsFeedAction';

class NewsFeedContent extends Component {
  state = {
    statistic: '',
    isLiked: false,
    photoUri: [],
  };
  
  componentDidMount() {
    this.drawStatistic();
    this.handleCreatedDate();
    this.handlePhoto();
  }
  
  componentDidUpdate(prevProps) {
    const { likeTotal, commentTotal, shareTotal, dateCreated, likes, photo } = this.props;
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
    if (prevProps.photo !== photo) {
      this.handlePhoto();
    }
  }
  
  handlePhoto = () => {
    const { photo } = this.props;
    if (!photo) return;
    const photoUri = photo.split(',').map((item) => `${AppConfig.uri.image}/${item}`);
    this.setState({ photoUri });
  };
  
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

  render() {
    const {
      userName,
      content,
      showBackButton,
      onBackPressed,
      avatar,
    } = this.props;
    const { statistic, dateCreated, photoUri } = this.state;
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
            source={avatar}
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
        <Text
          style={{
            ...Fonts.TITLE_NORMAL,
            color: Colors.text,
            lineHeight: moderateScale(18),
            letterSpacing: 0.3,
            marginBottom: moderateScale(10),
          }}
        >
          {content}
        </Text>
        {Array.isArray(photoUri) && photoUri.length
          ? (
            <FBCollage 
              images={photoUri}
              imageOnPress={() => {}}
            />
          )
          : null
        }
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginBottom: moderateScale(5),
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
        <NewsFeedAction {...this.props} />
      </TouchableOpacity>
    )
  };
}

export default NewsFeedContent;
