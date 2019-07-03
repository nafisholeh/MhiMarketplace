import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { DotIndicator } from 'react-native-indicators';
import LinearGradient from 'react-native-linear-gradient';

import { screenWidth } from 'Lib';
import { Colors } from 'Themes';

const ButtonMain = ({ style, onPress, loading, disabled, title, colors }) => (
  <LinearGradient
    start={{x: 0, y: 0}} end={{x: 1, y: 0}}
    colors={colors || [ Colors.veggie_light, Colors.veggie_dark ]}
    style={{
      ...{ height: 50 },
      ...style
    }}
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
)

export default ButtonMain;
