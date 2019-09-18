import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { func } from 'prop-types';

import ViewShadow from '../Shadow/ViewShadow';
import { screenWidth, moderateScale } from 'Lib';
import { Colors } from 'Themes';

class ProductVerticalWrapper extends Component {
  render() {
    const {
      height,
      marginHorizontal,
      borderRadius,
      shadowBorderRadiusAndroid,
      shadowRadiusAndroid,
      children,
      styleChildren,
      onPress
    } = this.props;
    return (
      <ViewShadow
        width={(screenWidth / 2) - moderateScale(marginHorizontal || 25)}
        height={height || 220}
        borderRadius={borderRadius || 4}
        shadowBorderRadiusAndroid={shadowBorderRadiusAndroid || 3}
        shadowRadiusAndroid={shadowRadiusAndroid || 18}
        shadowOpacityAndroid={0.1}
        mainColor={Colors.white}
        shadowColor={Colors.brown_light}
        style={{ alignSelf: 'flex-start' }}
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
