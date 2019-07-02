import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { func } from 'prop-types';

import ViewShadow from '../Shadow/ViewShadow';
import { screenWidth, moderateScale } from 'Lib';
import { Colors } from 'Themes';

class ProductVerticalWrapper extends Component {
  render() {
    const { children, onPress, styleParent, styleChildren } = this.props;
    return (
      <ViewShadow
        width={screenWidth - 40}
        height={115}
        borderRadius={4}
        shadowBorderRadiusAndroid={3}
        shadowRadiusAndroid={18}
        shadowOpacityAndroid={0.1}
        mainColor={Colors.white}
        shadowColor={Colors.brown_light}
        style={{
          ...{ marginHorizontal: moderateScale(18) },
          ...styleParent 
        }}
        styleChildren={{ padding: moderateScale(10) }}
      >
        <TouchableOpacity
          style={{
            ...{ flex: 1 },
            ...styleChildren
          }}
          onPress={() => {
            const { onPress } = this.props;
            if (onPress) onPress();
          }}
        >
          {children}
        </TouchableOpacity>
      </ViewShadow>
    );
  }
}

ProductVerticalWrapper.propTypes = {
  onPress: func,
};

export default ProductVerticalWrapper;
