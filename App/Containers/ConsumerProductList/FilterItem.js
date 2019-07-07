import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { string, func } from 'prop-types';

import { Images, Colors } from 'Themes';
import { moderateScale } from 'Lib';

class FilterItem extends Component {
  render() {
    const { title, onPress } = this.props;
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: moderateScale(20),
        }}
      >
        <Text
          style={{
            fontFamily: 'CircularStd-Book',
            fontSize: 14,
            color: Colors.text_light,
            marginRight: moderateScale(10),
          }}
        >
          Hasil dari:
        </Text>
        <TouchableOpacity
          onPress={onPress}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: Colors.red2,
            borderRadius: 5,
            padding: moderateScale(5),
          }}
        >
          <Text
            style={{
              fontFamily: 'CircularStd-Book',
              fontSize: 14,
              color: Colors.white,
              marginRight: moderateScale(5),
            }}
          >
            {title}
          </Text>
          <Image
            source={Images.cross}
            style={{
              height: moderateScale(15),
              width: moderateScale(15),
              tintColor: Colors.white,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

FilterItem.propTypes = {
  title: string,
  onPress: func,
};

export default FilterItem;
