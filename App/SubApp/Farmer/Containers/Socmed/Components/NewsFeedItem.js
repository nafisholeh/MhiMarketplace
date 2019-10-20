import React, { Component, Fragment } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import moment from 'moment';

import { Fonts, Colors, Images } from 'Themes';
import { moderateScale, getIntervalTimeToday } from 'Lib';
import { Avatar } from 'CommonFarmer';

class NewsFeedItem extends Component {
  state = {
    statistic: '',
  };
  
  componentDidMount() {
    this.drawStatistic();
    this.handleCreatedDate();
  }
  
  componentDidUpdate(prevProps) {
    const { likeTotal, commentTotal, shareTotal, dateCreated } = this.props;
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
  }
  
  handleCreatedDate = () => {
    const { dateCreated } = this.props;
    this.setState({ 
      dateCreated: moment.unix(dateCreated/1000).format("YYYY-MM-DD HH:mm")
    });
  };
  
  drawStatistic = () => {
    const { likeTotal, commentTotal, shareTotal } = this.props;
    this.setState({
      statistic:
        `${likeTotal ? `${likeTotal} suka ` : ``}`
        + `${commentTotal ? `${commentTotal} komentar ` : ``}`
        + `${shareTotal ? `${shareTotal} share` : ``}`
    });
  };

  onPressWrapper = () => {
    const { onPressWrapper, feedId } = this.props;
    if (onPressWrapper) {
      onPressWrapper(feedId);
    }
  };
  
  renderButton = (title, icon, onPress) => (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: moderateScale(5),
      }}
    >
      <Image
        source={Images[icon]}
        style={{
          width: moderateScale(20),
          height: moderateScale(20),
          tintColor: Colors.icon,
          marginRight: moderateScale(5),
        }}
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
      userName,
      content,
      onLike,
      onComment,
      showBackButton,
      onBackPressed,
      showActionBorder
    } = this.props;
    const { statistic, dateCreated } = this.state;
    return (
      <TouchableOpacity
        onPress={this.onPressWrapper}
        disabled={showBackButton}
        style={{
          paddingHorizontal: moderateScale(10),
          paddingVertical: moderateScale(showBackButton ? 15 : 10),
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            paddingBottom: moderateScale(15),
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
            paddingBottom: showActionBorder ? moderateScale(10) : 0,
            marginBottom: showActionBorder ? moderateScale(10) : 0
          }}
        >
          {this.renderButton('suka', 'like', onLike)}
          {this.renderButton('komentar', 'comment', onComment)}
        </View>
      </TouchableOpacity>
    )
  };
}

const mapStateToProps = createStructuredSelector({
  
});

const mapDispatchToProps = dispatch => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeedItem);
