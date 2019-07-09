import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { string, number, oneOfType, func } from 'prop-types';

import { Colors } from 'Themes';
import { moderateScale } from 'Lib';

class ListHeader extends Component {
  render() {
    const {
      title,
      color = 'black',
      onNavigate = (() => {})
    } = this.props;
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: moderateScale(15),
        }}
      >
        {title &&
          <View
            style={{
              padding: moderateScale(5),
              backgroundColor: color,
              borderRadius: 3,
            }}
          >
            <Text
              style={{
                fontFamily: 'CircularStd-Book',
                fontSize: 10,
                color: Colors.white,
              }}
            >
              {title}
            </Text>
          </View>
        }
        {onNavigate &&
          <TouchableOpacity
            onPress={() => onNavigate()}
          >
            <Text
              style={{
                fontFamily: 'CircularStd-Book',
                fontSize: 12,
                color: Colors.red2,
              }}
            >
              SEE ALL
            </Text>
          </TouchableOpacity>
        }
      </View>
    );
  }
}

ListHeader.propTypes = {
  title: string,
  color: oneOfType([ string, number ]),
  onNavigate: func,
};

export default ListHeader;
