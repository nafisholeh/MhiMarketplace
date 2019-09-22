import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { DotIndicator } from 'react-native-indicators';
import LinearGradient from 'react-native-linear-gradient';

import { screenWidth, moderateScale } from 'Lib';
import { Colors } from 'Themes';

const WIDTH = 55;
const WIDTH_ICON = WIDTH / 2;
const RADIUS = WIDTH / 2;

const ButtonCircle = ({ style, onPress, loading, disabled, title, colors, icon }) => (
  <LinearGradient
    start={{x: 0, y: 0}} end={{x: 1, y: 0}}
    colors={
      disabled ? 
        [ Colors.disabled_light, Colors.disabled_dark ]
        : (colors || [ Colors.veggie_light, Colors.veggie_dark ])
    }
    style={{
      ...{
        height: moderateScale(WIDTH),
        width: moderateScale(WIDTH),
        borderRadius: moderateScale(RADIUS),
      },
      ...style
    }}
  >
    <TouchableOpacity
      onPress={() => onPress()}
      disabled={disabled}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: moderateScale(WIDTH),
        width: moderateScale(WIDTH),
        borderRadius: moderateScale(RADIUS),
      }}
    >
      <Image
        source={icon}
        style={{
          height: moderateScale(WIDTH_ICON),
          width: moderateScale(WIDTH_ICON),
          tintColor: Colors.white,
        }}
      />
    </TouchableOpacity>
  </LinearGradient>
)

export default ButtonCircle;
