import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { DotIndicator } from 'react-native-indicators';
import LinearGradient from 'react-native-linear-gradient';

import ViewShadow from './Shadow/ViewShadow';
import { screenWidth, moderateScale } from 'Lib';
import { Colors } from 'Themes';

const ButtonMain = ({ style, onPress, loading, disabled, title, colors }) => (
  <ViewShadow
    width={screenWidth - 70}
    height={42}
    borderRadius={3}
    shadowBorderRadiusAndroid={3}
    shadowRadiusAndroid={10}
    shadowOpacityAndroid={0.15}
    mainColor={Colors.white}
    shadowColor={Colors.brown_light}
    style={{
      ...{ alignSelf: 'center' },
      ...style 
    }}
  >
    <LinearGradient
      start={{x: 0, y: 0}} end={{x: 1, y: 0}}
      colors={colors}
      style={{ height: 42, borderRadius: 3 }}
    >
      <TouchableOpacity
        onPress={() => onPress()}
        disabled={disabled}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center' 
        }}
      >
        {loading && (
          <DotIndicator
            count={4}
            size={7}
            color='white'
            animationDuration={800}
          />
        )}
        {!loading && (
          <Text
            style={{
              fontFamily: 'CircularStd-Bold',
              fontSize: 16,
              color: 'white'
            }}
          >
            {title}
          </Text>
        )}
      </TouchableOpacity>
    </LinearGradient>
  </ViewShadow>
)

export default ButtonMain;
