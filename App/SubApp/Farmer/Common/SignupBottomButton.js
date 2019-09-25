import React, { Component } from 'react';
import { View } from 'react-native';

import { ButtonPrimary } from 'Components';
import { moderateScale } from 'Lib';
import { Metrics, Colors } from 'Themes';

class SignupBottomButton extends Component {
  render() {
    const { onPressSkip, onPressNext } = this.props;
    return (
      <View
        style={{
          flexDirection: 'row',
          width: Metrics.deviceWidth,
          height: moderateScale(50),
        }}
      >
        <ButtonPrimary
          onPress={() => onPressSkip()}
          title="Lewati"
          colors={[ Colors.white, Colors.white ]}
          style={{
            width: Metrics.deviceWidth / 2,
            height: moderateScale(50),
            borderTopColor: Colors.disabled_light,
            borderTopWidth: 0.5,
          }}
          styleTitle={{
            fontFamily: 'CircularStd-Book',
            color: Colors.disabled_dark,
          }}
        />
        <ButtonPrimary
          onPress={() => onPressNext()}
          title="Lanjut"
          style={{
            width: Metrics.deviceWidth / 2,
            height: moderateScale(50),
            borderTopColor: Colors.veggie_dark,
            borderTopWidth: 0.5,
          }}
        />
      </View>
    );
  }
}

export default SignupBottomButton;
