import React, { Component } from 'react';

import { screenWidth, moderateScale } from 'Lib';
import { ProductHorizontalWrapper } from 'Components';

class SignupBoxWrapper extends Component {
  render() {
    const { children, height } = this.props;
    return (
      <ProductHorizontalWrapper
        width={screenWidth - moderateScale(20)}
        height={moderateScale(height || 100)}
        borderRadius={10}
        shadowRadiusAndroid={13}
        style={{
          marginBottom: moderateScale(5),
          marginBottom: moderateScale(10),
          marginHorizontal: moderateScale(10),
        }}
        styleChildren={{
          paddingHorizontal: moderateScale(15),
          paddingVertical: moderateScale(15),
        }}
        touchDisabled
      >
        {children}
      </ProductHorizontalWrapper>
    );
  }
}

export default SignupBoxWrapper;
