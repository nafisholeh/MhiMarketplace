import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { func } from 'prop-types';

import ViewShadow from '../Shadow/ViewShadow';
import { screenWidth, moderateScale } from 'Lib';
import { Colors } from 'Themes';

class ProductDetailWrapper extends Component {
  render() {
    const { children, onPress } = this.props;
    return (
      <ViewShadow
        width={screenWidth - 60}
        height={365}
        borderRadius={10}
        shadowBorderRadiusAndroid={10}
        shadowRadiusAndroid={18}
        shadowOpacityAndroid={0.09}
        mainColor={Colors.white}
        shadowColor={Colors.brown_light}
        style={{ marginHorizontal: moderateScale(18), marginTop: moderateScale(10) }}
      >
        {children}
      </ViewShadow>
    );
  }
}

ProductDetailWrapper.propTypes = {};

export default ProductDetailWrapper;
