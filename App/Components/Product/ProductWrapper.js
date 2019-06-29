import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { func } from 'prop-types';

import ViewShadow from '../Shadow/ViewShadow';
import { screenWidth, moderateScale } from 'Lib';
import { Colors } from 'Themes';

class ProductWrapper extends Component {
  render() {
    const { children, onPress } = this.props;
    return (
      <ViewShadow
        width={screenWidth - 40}
        height={115}
        borderRadius={4}
        shadowBorderRadiusAndroid={3}
        shadowRadiusAndroid={18}
        shadowOpacityAndroid={0.05}
        mainColor={Colors.white}
        shadowColor={Colors.brown_light}
        style={{ marginHorizontal: moderateScale(18) }}
        styleChildren={{ padding: moderateScale(10) }}
      >
        <TouchableOpacity
          style={{ flex: 1 }}
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

ProductWrapper.propTypes = {
  onPress: func,
};

export default ProductWrapper;
