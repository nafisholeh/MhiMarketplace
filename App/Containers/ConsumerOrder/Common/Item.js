import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { string, func } from 'prop-types';

import { Colors } from 'Themes';
import { ViewShadow } from 'Components';
import { screenWidth, moderateScale } from 'Lib';

class Item extends Component {
  onClickItem = () => {
    const { onSelectItem, id } = this.props;
    if (onSelectItem) onSelectItem(id);
  };

  render() {
    const { id, transactionId, title, subtitle, body, index } = this.props;
    return (
      <ViewShadow
        width={screenWidth - 35}
        height={60}
        borderRadius={10}
        shadowBorderRadiusAndroid={10}
        shadowRadiusAndroid={10}
        shadowOpacityAndroid={0.09}
        mainColor={Colors.white}
        shadowColor={Colors.brown_light}
        style={{ 
          marginTop: !index ? moderateScale(15) : moderateScale(3),
          marginBottom: moderateScale(7)
        }}
      >
        <TouchableOpacity
          onPress={this.onClickItem}
          style={{
            paddingHorizontal: moderateScale(15),
            paddingVertical: moderateScale(10),
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: moderateScale(4),
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                fontFamily: 'CircularStd-Bold',
                fontSize: 14,
                color: 'rgba(0,0,0,0.68)',
              }}
            >
              {`#${transactionId}` || '-'}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                fontFamily: 'CircularStd-Book',
                fontSize: 14,
                color: 'rgba(0,0,0,0.68)',
              }}
            >
              {subtitle || '-'}
            </Text>
          </View>
          <Text
            style={{
              fontFamily: 'CircularStd-Book',
              fontSize: 14,
              color: 'rgba(0,0,0,0.3)',
            }}
            numberOfLines={1}
          >
            {title || '-'}
          </Text>
          {body && (
            <Text numberOfLines={1}>
              {body}
            </Text>
          )}
        </TouchableOpacity>
      </ViewShadow>
    );
  }
}

Item.propTypes = {
  id: string,
  transactionId: string,
  title: string,
  subtitle: string,
  body: string,
};

export default Item;
