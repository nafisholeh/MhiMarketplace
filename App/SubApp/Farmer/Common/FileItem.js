import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { string } from 'prop-types';

import { ProductHorizontalWrapper } from 'Components';
import { moderateScale, screenWidth } from 'Lib';
import { Colors, Fonts } from 'Themes';

class FileItem extends Component {
  render() {
    const { title, desc, thumbnail } = this.props;
    return (
      <ProductHorizontalWrapper
        styleChildren={{
          padding: moderateScale(8),
          alignItems: 'center',
        }}
        style={{
          alignSelf: 'center',
        }}
        width={screenWidth / 2 - moderateScale(30)}
        height={150}
        borderRadius={8}
      >
        <Image
          source={{ uri: thumbnail }}
          style={{
            width: moderateScale(40),
            height: moderateScale(40),
            marginTop: moderateScale(35),
            alignSelf: 'center',
          }}
        />
        <Text 
          style={{
            position: 'absolute',
            bottom: moderateScale(15),
            left: 0, right: 0,
            textAlign: 'center',
            marginRight: moderateScale(5),
            ...Fonts.TITLE_HEADER__SMALL
          }}
          numberOfLines={1}
        >
          {title}
        </Text>
      </ProductHorizontalWrapper>
    )
  };
}

export default FileItem;
