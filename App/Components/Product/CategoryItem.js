import React, { Component } from 'react';
import { TouchableOpacity, Image, Text } from 'react-native';
import { oneOfType, func, number, string } from 'prop-types';

import { moderateScale } from 'Lib';

class CategoryItem extends Component {
  render() {
    const { onPress, icon, title, color } = this.props;
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          height: moderateScale(77),
          width: moderateScale(77),
          flexDirection: 'column',
          paddingTop: moderateScale(10),
          alignItems: 'center',
          backgroundColor: color,
          borderRadius: 10,
          marginRight: moderateScale(10)
        }}
      >
        <Image
          source={icon}
          style={{
            width: moderateScale(45),
            height: moderateScale(40),
          }}
        />
        <Text
          style={{
            position: 'absolute',
            bottom: moderateScale(5),
            fontFamily: 'CircularStd-Book',
            fontSize: 9,
            color: 'rgba(0,0,0,0.8)',
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
}

CategoryItem.propTypes = {
  onPress: func,
  icon: oneOfType([ number, string ]),
  title: string,
}

export default CategoryItem;
