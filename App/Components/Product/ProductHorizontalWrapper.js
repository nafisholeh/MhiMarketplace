import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { func } from 'prop-types';

import ViewShadow from '../Shadow/ViewShadow';
import { screenWidth, moderateScale } from 'Lib';
import { Colors } from 'Themes';

class ProductVerticalWrapper extends Component {
  render() {
    const { children, onPress } = this.props;
    return (
      <ViewShadow
        width={(screenWidth / 2) - moderateScale(25)}
        height={220}
        borderRadius={4}
        shadowBorderRadiusAndroid={3}
        shadowRadiusAndroid={18}
        shadowOpacityAndroid={0.1}
        mainColor={Colors.white}
        shadowColor={Colors.brown_light}
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

ProductVerticalWrapper.propTypes = {
  onPress: func,
};

export default ProductVerticalWrapper;
