import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
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
      styleWrapper,
    } = this.props;
    return (
      <ViewShadow
        width={screenWidth - moderateScale(marginHorizontal || 25)}
        height={height || 130}
        borderRadius={borderRadius || 4}
        shadowBorderRadiusAndroid={shadowBorderRadiusAndroid || 3}
        shadowRadiusAndroid={shadowRadiusAndroid || 18}
        shadowOpacityAndroid={0.1}
        mainColor={Colors.white}
        shadowColor={Colors.brown_light}
      >
        <View
          style={{
            ...{
              flex: 1,
              flexDirection: 'column',
            },
            ...styleWrapper
          }}
        >
          {children}
        </View>
      </ViewShadow>
    );
  }
}

AreaDrawInfoWrapper.propTypes = {
  onPress: func,
};

export default AreaDrawInfoWrapper;
