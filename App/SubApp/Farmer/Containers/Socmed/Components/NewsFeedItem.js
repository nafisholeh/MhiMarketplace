import React, { Component, Fragment } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import moment from 'moment';

import { Fonts, Colors, Images } from 'Themes';
import { moderateScale, getIntervalTimeToday } from 'Lib';
import { Avatar } from 'CommonFarmer';
import NewsFeedDivider from './NewsFeedDivider';

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
    const { userName, content } = this.props;
    const { statistic, dateCreated } = this.state;
    return (
      <Fragment>
        <View
          style={{
            paddingHorizontal: moderateScale(10),
            paddingVertical: moderateScale(10),
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: moderateScale(15),
            }}
          >
            <Avatar
              size="small"
              style={{ marginRight: moderateScale(10) }}
            />
            <View
              style={{
                
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
            }}
          >
            {this.renderButton('suka', 'like', this.onLike)}
            {this.renderButton('komentar', 'comment', this.onComment)}
          </View>
        </View>
        <NewsFeedDivider/>
      </Fragment>
    )
  };
}

const mapStateToProps = createStructuredSelector({
  
});

const mapDispatchToProps = dispatch => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsFeedItem);
