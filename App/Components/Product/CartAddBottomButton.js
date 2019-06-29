import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { DotIndicator } from 'react-native-indicators';
import LinearGradient from 'react-native-linear-gradient';

import { screenWidth } from 'Lib';
import { Colors } from 'Themes';

const CartAddBottomButton = ({ onPress, loading, title, colors }) => (
  <LinearGradient
    start={{x: 0, y: 0}} end={{x: 1, y: 0}}
    colors={colors}
    style={{
      height: 50,
    }}
  >
    <TouchableOpacity
      onPress={() => onPress()}
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

export default CartAddBottomButton;
