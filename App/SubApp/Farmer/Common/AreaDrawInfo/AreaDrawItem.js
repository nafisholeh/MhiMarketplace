import React, { Component } from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import { TextField } from 'react-native-material-textfield';

import { ProductHorizontalWrapper } from 'Components';
import { moderateScale } from 'Lib';
import { Colors, Images } from 'Themes';

class AreaDrawItem extends Component {
  state = {
    value: '',
  };

  render() {
    const { value } = this.state;
    const { title, isFilled, onPress } = this.props;
    return (
      <ProductHorizontalWrapper
        styleParent={{
          marginBottom: moderateScale(15)
        }}
        styleChildren={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        height={120}
        shadowRadiusAndroid={8}
        onPress={onPress}
      >
      
        <Image
          source={isFilled ? Images.map : Images.map_disabled}
          style={{
            width: moderateScale(50),
            height: moderateScale(50),
            marginBottom: moderateScale(15),
          }}
        />
        <Text
          style={{
            fontFamily: 'CircularStd-Book',
            fontSize: 16,
            color: 'rgba(0,0,0,0.68)',
          }}
          numberOfLines={1}
        >
          {title}
        </Text>
      </ProductHorizontalWrapper>
    );
  }
}

export default AreaDrawItem;
