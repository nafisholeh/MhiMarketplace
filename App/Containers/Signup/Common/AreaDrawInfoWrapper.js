import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { func } from 'prop-types';

import { ViewShadow } from 'Components';
import { screenWidth, moderateScale } from 'Lib';
import { Colors } from 'Themes';

class AreaDrawInfoWrapper extends Component {
  render() {
    const {
      height,
      marginHorizontal,
      borderRadius,
      shadowBorderRadiusAndroid,
      shadowRadiusAndroid,
      children,
    } = this.props;
    return (
      <ViewShadow
        width={screenWidth - moderateScale(marginHorizontal || 25)}
        height={height || 150}
        borderRadius={borderRadius || 4}
        shadowBorderRadiusAndroid={shadowBorderRadiusAndroid || 3}
        shadowRadiusAndroid={shadowRadiusAndroid || 18}
        shadowOpacityAndroid={0.1}
        mainColor={Colors.white}
        shadowColor={Colors.brown_light}
        style={{ alignSelf: 'flex-start' }}
      >
        {children}
      </ViewShadow>
    );
  }
}

AreaDrawInfoWrapper.propTypes = {
  onPress: func,
};

export default AreaDrawInfoWrapper;
