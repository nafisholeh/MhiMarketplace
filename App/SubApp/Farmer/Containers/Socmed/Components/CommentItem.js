import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { Colors, Fonts } from 'Themes';
import { moderateScale } from 'Lib';
import { Avatar } from 'CommonFarmer';

class CommentItem extends Component {
  render() {
    const { content, photo, name, onLike, onComment } = this.props;
    return (
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: moderateScale(10),
          marginBottom: moderateScale(10),
        }}
      >
        <View
          style={{
            marginRight: moderateScale(10),
            marginTop: moderateScale(3),
          }}
        >
          <Avatar
            source={photo}
            size="small"
          />
        </View>
        
        <View
          style={{
            flexShrink: 1,
          }}
        >
          <View
            style={{
              backgroundColor: Colors.text_bg,
              borderRadius: moderateScale(15),
              paddingHorizontal: moderateScale(15),
              paddingVertical: moderateScale(10),
              marginBottom: moderateScale(5),
            }}
          >
            <Text
              style={{
                ...Fonts.TITLE_NORMAL,
                fontWeight: 'bold',
                marginBottom: moderateScale(3),
              }}
            >
              {name}
            </Text>
            <Text
              style={{
                ...Fonts.TITLE_NORMAL,
                lineHeight: moderateScale(18),
                letterSpacing: 0.5
              }}
            >
              {content}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: moderateScale(15),
            }}
          >
            <Text
              style={{
                ...Fonts.TITLE_SMALL,
                marginRight: moderateScale(15),
              }}
            >
              18h
            </Text>
            <TouchableOpacity
              onPress={onLike}
              style={{
                marginRight: moderateScale(15),
              }}
            >
              <Text
                style={{
                  ...Fonts.TITLE_SMALL,
                  color: Colors.text,
                  fontWeight: 'bold',
                }}
              >
                like
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onComment}
            >
              <Text
                style={{
                  ...Fonts.TITLE_SMALL,
                  color: Colors.text,
                  fontWeight: 'bold',
                }}
              >
                comment
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
      </View>
    );
  }
}

export default CommentItem;
